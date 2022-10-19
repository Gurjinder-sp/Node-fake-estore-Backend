const express = require('express');
var cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json({extended: false}));

const stripe = require('stripe')('sk_test_51HrjYlDnGuaAT4tp1HZIfBGgy6qX2AtINCdEvxFqWJEUHybAGgy2hYI8yhj6QZDFF10r1CdQOZa3axuvybKqzX8j009E1B24Db');


app.get('/secret', async (req, res) => {
    const intent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: 'inr',
        automatic_payment_methods: {enabled: true},
      });
    res.json({client_secret: intent.client_secret});
  });

app.listen(port, () => console.log(`server started on port ${port}`));

