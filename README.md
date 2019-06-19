# Node.js-MySQL

This is an Amazon-like storefront app, which was built by using MySQL. The app will take in orders from customers and deplete stock from the store's inventory. The user can program this app to track product sales across all store's departments and then provide a summary of the highest-grossing departments in the store.


## Instructions

#1: Customer View

1. this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

2. The app should then prompt users with two messages.

    * The first should ask them the ID of the product they would like to buy.
    * The second message should ask how many units of the product they would like to buy.

3. Once the customer has placed the order, the application should check if the department store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

   Format: ![Alt Text](/images/customer2.gif)

4. However, if department store _does_ have enough of the product, the customer's order will be fulfilled

   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.

      Format: ![Alt Text](/images/customer1.gif)

