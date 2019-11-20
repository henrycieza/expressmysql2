const express = require('express');
const router = express.Router();

const customerController = require('../querys/queryCustomer');
const guestController = require('../querys/queryGuest');
const bookingController = require('../querys/queryBooking');

//const app = express();

// CUSTOMER

router.route('/')
  .get(customer)
  .post(addCustomer)

router.route('/:id')
	.put(updateCustomer)
	.delete(deleteCustomer)

// GUEST

router.route('/')
  .get(guest)
  .post(addguest)

router.route('/:id')
	.put(updateGuest)
	.delete(deleteGuest)

// BOOKING

router.route('/')
  .get(booking)
  .post(addBooking)

router.route('/:id')
	.put(updateBooking)
	.delete(deleteBooking)


export default router;

