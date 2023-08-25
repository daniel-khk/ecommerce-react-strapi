'use strict';
// @ts-ignore
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

//module.exports = createCoreController('api::order.order');

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
	async create(ctx) {
		const { products } = ctx.request.body;
		try {
			const lineItems = await Promise.all(
				products.map(async (product) => {
					return {
						price_data: {
							currency: "cad",
							product_data: {
								name: product.name + " (" + product.color + ", " + product.selectedOption + ")",
							},
							unit_amount: product.price * 100,
						},
						quantity: product.count,
					};
				})
			);

			// create a stripe session
			const session = await stripe.checkout.sessions.create({
				payment_method_types: ["card"],
				mode: "payment",
				success_url: "http://localhost:3000/checkout/success",
				cancel_url: "http://localhost:3000/cart",
				line_items: lineItems,
			});

			// create the item
			await strapi
				.service("api::order.order")
				.create({ data: { products, stripeSessionId: session.id } });

			// return the session id
			return { id: session.id };
		} catch (error) {
			return { error };

		}
	}
}));
