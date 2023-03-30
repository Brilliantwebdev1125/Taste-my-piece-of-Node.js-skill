export  const user = {
  app_id: '140c30fb-9c93-4fbc-b3e2-04479cd7926a',
  profile_id: '13d66ef2-3041-4087-b094-3029be1df52b',
  customer_user_id: '60c726d4c1d6cf00120e9d5b',
  paid_access_levels: {
    premium: {
      id: 'premium',
      is_active: false,
      is_lifetime: false,
      expires_at: '2021-09-23T18:00:59.000000+0000',
      starts_at: null,
      will_renew: false,
      vendor_product_id: 'monthly_subscription_droid',
      store: 'play_store',
      activated_at: '2021-09-23T17:25:59.000000+0000',
      renewed_at: null,
      unsubscribed_at: '2021-09-23T18:00:59.000000+0000',
      billing_issue_detected_at: null,
      is_in_grace_period: false,
      active_introductory_offer_type: null,
      active_promotional_offer_type: null,
      active_promotional_offer_id: null,
      cancellation_reason: 'billing_error',
      is_refund: false
    }
  },
  subscriptions: {
    monthly_subscription_droid: {
      is_active: false,
      is_lifetime: false,
      expires_at: '2021-09-23T18:00:59.000000+0000',
      starts_at: null,
      will_renew: false,
      vendor_product_id: 'monthly_subscription_droid',
      vendor_transaction_id: 'GPA.3315-9295-4372-78325..5',
      vendor_original_transaction_id: 'GPA.3315-9295-4372-78325',
      store: 'play_store',
      activated_at: '2021-09-23T17:25:59.000000+0000',
      renewed_at: null,
      unsubscribed_at: '2021-09-23T18:00:59.000000+0000',
      billing_issue_detected_at: null,
      is_in_grace_period: false,
      active_introductory_offer_type: null,
      active_promotional_offer_type: null,
      active_promotional_offer_id: null,
      cancellation_reason: 'billing_error',
      is_sandbox: true,
      is_refund: false
    }
  },
  non_subscriptions: {
    month_subscription: {
      vendor_original_transaction_id: "transaction_id"
    }
  },
  promotional_offer_eligibility: true,
  introductory_offer_eligibility: true,
  custom_attributes: {}
};

export const giftCode = {
  source: "APP",
  isActive: true,
  isUsed: false,
  _id: "614cef2fa5cc24002b21f49f",
  code: "YEEN7H",
  createdAt: 1632431918905,
  template: "month_subscription"
}

export const activeGiftCode = {
  source: "APP",
  isActive: true,
  isUsed: false,
  _id: "614cef2fa5cc24002b21f49f",
  code: "YEEN7H",
  createdAt: 1632431918905,
  template: "month_subscription"
}

export const templateMock = {
  _id : "614a1823c171720047064191",
  isActive : true,
  androidProductId : "android_product_id",
  iosProductId : "ios_product_id",
  accessLevel : "PREMIUM",
  websiteProductId : "website_product_id",
  name : "3_months_template",
  months : 3,
}

export const inactiveTemplateMock = {
  _id : "614a1823c171720047064192",
  isActive : false,
  androidProductId : "android_product_id",
  iosProductId : "ios_product_id",
  accessLevel : "PREMIUM",
  websiteProductId : "website_product_id",
  name : "6_months_template",
  months : 6,
}

export const bulkCreateCodesMock = {
  successful: [
    {
      receiver: "test1@gmail.com",
      code: "D683KF"
    },
    {
      receiver: "test2@gmail.com",
      code: "H7RPA3"
    }
  ],
  failed: []
}
