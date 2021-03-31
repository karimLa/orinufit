export default function formatMoney(amount = 0) {
	const opts: Intl.NumberFormatOptions = {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
	}

	if (amount % 100 === 0) {
		opts.minimumFractionDigits = 0;
	}

	const formatter = Intl.NumberFormat('en-US', opts)

	// Amount is in cents
	// devied by 100 to convert to dollar
	return formatter.format(amount / 100)
}