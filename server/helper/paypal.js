const paypal = require('paypal-rest-sdk')

paypal.configure({
    mode: 'sandbox',
    client_id: 'ARd8wgaFFagDK-9C-eIIhATILXEHsYm1hvdDS2t7x476TKtYhiK3bEJ2yMb927E04DjXNZssES25cV73',
    client_secret: 'EEJhoTUijRp6kJ87Gwm-ccKQeuD00wHqUExX_wT2e2UQa4_Vaf26zkbZnWBiOhTfuVO7zzaxYQC2F1-Q',
})

module.exports = paypal