// ========= ID Mapping ========= //
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

// ========= Script by @Ohoang7 — FIXED by ChatGPT ========= //

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];

try {
  var body = $response.body || '';
  if (!body || body.trim() === '') throw new Error("Empty body");

  var obj = JSON.parse(body);

  obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

  var ohoang7 = {
    is_sandbox: false,
    ownership_type: "PURCHASED",
    billing_issues_detected_at: null,
    period_type: "normal",
    expires_date: "2099-12-18T01:04:17Z",
    grace_period_expires_date: null,
    unsubscribe_detected_at: null,
    original_purchase_date: "2024-07-28T01:04:18Z",
    purchase_date: "2024-07-28T01:04:17Z",
    store: "app_store"
  };

  var vuong2023 = {
    grace_period_expires_date: null,
    purchase_date: "2024-07-28T01:04:17Z",
    product_identifier: "com.ohoang7.premium.yearly",
    expires_date: "2099-12-18T01:04:17Z"
  };

  const match = Object.keys(mapping).find(e => ua.includes(e));
  if (match) {
    let [entitlement, product_id] = mapping[match];
    if (product_id) {
      vuong2023.product_identifier = product_id;
      obj.subscriber.subscriptions[product_id] = ohoang7;
    } else {
      obj.subscriber.subscriptions["com.ohoang7.premium.yearly"] = ohoang7;
    }
    obj.subscriber.entitlements[entitlement] = vuong2023;
  } else {
    obj.subscriber.subscriptions["com.ohoang7.premium.yearly"] = ohoang7;
    obj.subscriber.entitlements["pro"] = vuong2023;
  }

  $done({ body: JSON.stringify(obj) });

} catch (e) {
  console.log("⚠️ SCRIPT ERROR:", e.message);
  $done({}); // Trả về rỗng để tránh crash app
}
