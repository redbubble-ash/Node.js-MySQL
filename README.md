# Node.js-MySQL

This is an Amazon-like storefront app, which was built by using MySQL. The app will take in orders from customers and deplete stock from the store's inventory. The user can program this app to track product sales across all store's departments and then provide a summary of the highest-grossing departments in the store.


## Instructions

### 1: Customer View

1. this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

2. The app should then prompt users with two messages.

    * The first should ask them the ID of the product they would like to buy.
    * The second message should ask how many units of the product they would like to buy.

3. Once the customer has placed the order, the application should check if the department store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

   Example: ![Alt Text](/images/customer2.gif)

4. However, if department store _does_ have enough of the product, the customer's order will be fulfilled

   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.

   Example: ![Alt Text](/images/customer1.gif)

### 2: Manager View

* If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

   Example: ![Alt Text](/images/manager_view_products.gif)

* If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

   Example: ![Alt Text](/images/manager_view_low.gif)

* If a manager selects `Add to Inventory`, the app should display a prompt that will let the manager "add more" of any item currently in the store.

   Example: ![Alt Text](/images/manager_view_add_inv.gif)

* If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

   Example: ![Alt Text](/images/manager_add_new1.gif)

   Example: ![Alt Text](/images/manager_add_new2.gif)


### 3: Supervisor View

1. Running this application will list a set of menu options:

   * View Product Sales by Department
   
   * Create New Department

2. When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window.

   Example: ![Alt Text](/images/supervisor_view_profit.gif)


3. When a supervisor selects `Create New Department`, the app should allow the supervisor to add a department to the store.

   Example: ![Alt Text](/images/supervisor_add_department.gif)
