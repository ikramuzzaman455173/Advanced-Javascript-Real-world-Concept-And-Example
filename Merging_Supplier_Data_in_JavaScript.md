## Merging Supplier Data in JavaScript

### Table of Contents
1. [Introduction](#introduction)
2. [Code Explanation](#code-explanation)
3. [Real-World Example](#real-world-example)
4. [Similar Problem Questions](#similar-problem-questions)
5. [Output and Comments](#output-and-comments)

---

### Introduction
This documentation demonstrates how to merge and summarize supplier data by combining information from purchase returns and purchases. The goal is to provide a comprehensive view of each supplier’s financial interactions, including returns, bills, payments, and balances.

---

### Code Explanation

The code includes a function `mergeSupplierData` that consolidates data from multiple sources into a single summary for each supplier. The function takes three arrays of data: suppliers, purchase returns, and purchases.

#### `mergeSupplierData` Function
```javascript
const mergeSupplierData = (checkSupplierResults, checkPurchaseReturnResults, checkPurchaseResults) => {
  return checkSupplierResults.map(supplier => {
    const supplierId = supplier.id;

    // Find relevant purchase returns and purchases for the supplier
    const purchaseReturns = checkPurchaseReturnResults.filter(returnItem => returnItem.supplierId === supplierId);
    const purchases = checkPurchaseResults.filter(purchase => purchase.supplierId === supplierId);

    // Sum up total return product prices for the supplier
    const totalReturnProductPrice = purchaseReturns.reduce((sum, item) => sum + item.totalReturnProductPrice, 0);

    // Calculate the total bill, paid amount, and your balance added from purchases
    const totalBill = purchases.reduce((sum, item) => sum + item.totalBill, 0);
    const totalPaidAmount = purchases.reduce((sum, item) => sum + item.paidAmount, 0);
    const totalYourBalanceAdded = purchases.reduce((sum, item) => sum + item.yourBalanceAdded, 0);

    return {
      supplierId: supplierId,
      previousDue: supplier.previousDue,
      purchaseDue: supplier.purchaseDue,
      yourBalance: supplier.yourBalance,
      totalDue: supplier.totalDue,
      totalReturnProductPrice: totalReturnProductPrice,
      totalBill: totalBill,
      totalPaidAmount: totalPaidAmount,
      totalYourBalanceAdded: totalYourBalanceAdded
    };
  });
};
```

**Explanation**:
- **Purpose**: To merge and summarize financial data for suppliers, including returns, purchases, and payments.
- **Logic**:
    - **Filtering Data**: For each supplier, filter related purchase returns and purchases.
    - **Calculations**:
        - **`totalReturnProductPrice`**: Sum of the return prices from purchase returns.
        - **`totalBill`**: Sum of all bills from purchases.
        - **`totalPaidAmount`**: Total amount paid from all purchases.
        - **`totalYourBalanceAdded`**: Total balance added from all purchases.
    - **Return**: An array of objects where each object represents a summarized view of a supplier’s financial interactions.

---

### Real-World Example

Imagine an accounting system where you need to generate a report of all suppliers showing their total financial interactions, including returns and payments. Here's how this can be achieved using the provided code:

#### Example Data
```javascript
const checkSupplierResults = [
  {
    id: 11,
    previousDue: 0,
    purchaseDue: 0,
    yourBalance: 85,
    totalDue: 0
  }
];

const checkPurchaseReturnResults = [
  { purchaseId: 775, supplierId: 11, totalReturnProductPrice: 60 },
  { purchaseId: 776, supplierId: 11, totalReturnProductPrice: 75 }
];

const checkPurchaseResults = [
  {
    id: 775,
    supplierId: 11,
    totalBill: 15,
    paidAmount: 50,
    firstPaidAmount: 50,
    due: 0,
    yourBalanceAdded: 35
  },
  {
    id: 776,
    supplierId: 11,
    totalBill: 0,
    paidAmount: 50,
    firstPaidAmount: 50,
    due: 0,
    yourBalanceAdded: 50
  }
];
```

**Output of Merging**:
```javascript
const mergedData = mergeSupplierData(checkSupplierResults, checkPurchaseReturnResults, checkPurchaseResults);
console.log(mergedData);
```

#### Output:
```json
[
  {
    "supplierId": 11,
    "previousDue": 0,
    "purchaseDue": 0,
    "yourBalance": 85,
    "totalDue": 0,
    "totalReturnProductPrice": 135,
    "totalBill": 15,
    "totalPaidAmount": 100,
    "totalYourBalanceAdded": 85
  }
]
```

**Comment**:
- **`totalReturnProductPrice`**: The total return value is calculated as the sum of `60 + 75`, which equals `135`.
- **`totalBill`**: Total bill amounts are summed up, resulting in `15`.
- **`totalPaidAmount`**: Total paid amounts are summed up to `100`.
- **`totalYourBalanceAdded`**: Total balance added is summed to `85`.

---

### Similar Problem Questions

#### Question 1:
**How can we summarize financial interactions for multiple suppliers, including returns and payments, from different transaction sources?**

<details>
  <summary>Answer</summary>
  We can use a function similar to `mergeSupplierData` to aggregate financial data for each supplier. The function should filter data based on supplier IDs and then compute the necessary totals such as returns, bills, and payments.
</details>

#### Question 2:
**How do we handle multiple sources of financial data for suppliers to generate a consolidated report?**

<details>
  <summary>Answer</summary>
  To handle multiple sources, use a combination of filtering and reducing operations to compute total values from each data source. Merge and summarize the results for each supplier, ensuring that all financial aspects (returns, bills, payments) are included in the final report.
</details>

---

### Output and Comments

```javascript
const mergedData = mergeSupplierData(checkSupplierResults, checkPurchaseReturnResults, checkPurchaseResults);
console.log(mergedData);
```

**Comment**:
- The `mergeSupplierData` function effectively consolidates and summarizes financial data for each supplier.
- The output includes key financial metrics such as total return product prices, total bills, and total payments, providing a clear overview of each supplier's financial status.