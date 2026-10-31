export interface PosService {
  id: string;
  title: string;
  tagline: string;
  icon: string; // Lucide icon name or description
  description: string;
  feeStructure: string;
  features: string[];
}

export const POS_SERVICES: PosService[] = [
  {
    id: 'cash-withdrawal',
    title: 'Instant Cash Withdrawal',
    tagline: 'Lowest Cash Withdrawal Charges in Suleja',
    icon: 'Banknote',
    description: 'Withdraw cash with any Nigerian bank debit card (Mastercard, Visa, Verve). High cash availability guaranteed all day.',
    feeStructure: '₦100 for every ₦5,000 withdrawn',
    features: ['Supports All Debit Cards', 'Instant SMS & Print Receipts', 'Zero Network Downtime', 'Doorstep Bulk Cash Delivery Available']
  },
  {
    id: 'bank-transfer',
    title: 'Instant Bank Transfer',
    tagline: 'Direct Money Transfer to Any Nigerian Bank',
    icon: 'Send',
    description: 'Send funds instantly to any commercial bank, microfinance bank, or fintech account in Nigeria with live transaction confirmation.',
    feeStructure: '₦100 flat fee up to ₦100,000 transfer',
    features: ['Instant Credit Notification', 'All 50+ Nigerian Banks Supported', 'Print / WhatsApp Receipt', 'Secure Encrypted Terminal']
  },
  {
    id: 'utility-bills',
    title: 'Electricity & Utility Bills Payment',
    tagline: 'Pay AEDC & DisCo Bills with Zero Delay',
    icon: 'Zap',
    description: 'Token generation for prepaid electricity meters (Abuja Electricity Distribution Company AEDC, Kaduna Electric, etc.) and post-paid bill settlement.',
    feeStructure: '₦100 service charge per transaction',
    features: ['Instant Prepaid Token Generation', 'Prepaid & Postpaid Support', 'Direct SMS Token Delivery', 'Instant Payment Verification']
  },
  {
    id: 'cable-tv',
    title: 'Cable TV & Internet Recharge',
    tagline: 'Instant DStv, GOtv, Startimes & Data Top-Up',
    icon: 'Tv',
    description: 'Renew your television subscription packages or buy discounted mobile data bundles (MTN, Airtel, Glo, 9mobile) right at our shop.',
    feeStructure: 'Free / Zero Convenience Charge',
    features: ['Immediate TV Channel Reconnection', 'All Package Tiers Supported', 'Discounted Data Bundles', '24/7 Agent Terminal']
  },
  {
    id: 'doorstep-pos',
    title: 'Doorstep Cash & POS Delivery',
    tagline: 'Need Emergency Cash at Home or Event?',
    icon: 'Truck',
    description: 'Request a mobile POS agent to bring cash and a terminal directly to your home, office, wedding, or business location in Suleja & environs.',
    feeStructure: 'Standard POS Fee + ₦500 Local Dispatch Fee',
    features: ['Discreet Cash Handover', 'Event & Wedding Spraying Cash', 'Ideal for Office & Market Merchants', 'Fast 20-30 Mins Arrival']
  }
];

export function calculatePosFee(amount: number, type: 'withdrawal' | 'transfer' = 'withdrawal'): { fee: number; netAmount: number } {
  if (amount <= 0) return { fee: 0, netAmount: 0 };

  if (type === 'transfer') {
    if (amount <= 20000) return { fee: 100, netAmount: amount + 100 };
    if (amount <= 100000) return { fee: 150, netAmount: amount + 150 };
    return { fee: 200, netAmount: amount + 200 };
  } else {
    // Withdrawal
    if (amount <= 5000) return { fee: 100, netAmount: amount - 100 };
    if (amount <= 10000) return { fee: 200, netAmount: amount - 200 };
    if (amount <= 20000) return { fee: 300, netAmount: amount - 300 };
    if (amount <= 50000) return { fee: 500, netAmount: amount - 500 };
    const fee = Math.ceil(amount * 0.01);
    return { fee, netAmount: amount - fee };
  }
}
