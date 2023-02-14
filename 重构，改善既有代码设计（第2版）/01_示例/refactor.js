/**
 * 这个函数代码组织不清晰
 */
export function refactorStatement(invoice, plays) {
  const statementData = {}; // 数据中转，让 renderPlainText 只操作通过 data 参数传进来的数据，这样所有计算代码都可以被挪到 statement 函数中
  statementData.customer = invoice.customer;
  // 生成副本，避免修改传递过来的数据
  statementData.performances = invoice.performances.map(enrichPerformances);

  return renderPlainText(statementData, plays);

  function enrichPerformances(aPerformance) {
    const result = Object.assign({}, aPerformance);

    return result;
  }
}

function renderPlainText(data, plays) {
  let result = `Statement for ${data.customer}\n`;
  for (const perf of data.performances) {
    // print line for this order
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf) / 100)} (${
      perf.audience
    } seats)\n`;
  }

  result += `Amount owed is ${usd(totalAmount() / 100)}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;

  // 提炼函数
  function amountFor(aPerformance) {
    let result = 0;
    switch (playFor(aPerformance).type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }

    return result;
  }

  // 以查询取代临时变量
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function volumeCreditsFor(aPerformance) {
    let volumeCredits = 0;
    // add volume credits
    volumeCredits += Math.max(aPerformance.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ("comedy" === playFor(aPerformance).type)
      volumeCredits += Math.floor(aPerformance.audience / 5);

    return volumeCredits;
  }

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber);
  }

  function totalVolumeCredits() {
    let result = 0;
    for (const perf of data.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }

  function totalAmount() {
    let result = 0;
    for (const perf of data.performances) {
      result += amountFor(perf);
    }
    return result;
  }
}
