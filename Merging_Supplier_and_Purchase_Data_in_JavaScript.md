## Merging Supplier and Purchase Data in JavaScript

### Table of Contents
1. [Introduction](#introduction)
2. [Code Explanation](#code-explanation)
3. [Real-World Example](#real-world-example)
4. [Similar Problem Questions](#similar-problem-questions)
5. [Output and Comments](#output-and-comments)

---

### Introduction

This documentation explains the `mergeData` function, which merges supplier and purchase data with related purchase returns. The function consolidates information from different sources to provide a comprehensive view of each purchase, including details about returns and supplier information.

---

### Code Explanation

The `mergeData` function aggregates data by matching purchase records with their corresponding suppliers and purchase returns. It creates a merged object for each purchase that includes details from all relevant sources.

#### `mergeData` Function
```javascript
function mergeData(checkSupplierResults, checkPurchaseResults, checkPurchaseReturnResults) {
  const mergedResults = [];

  checkPurchaseResults.forEach(purchase => {
      const supplier = checkSupplierResults.find(s => s.id === purchase.supplierId);
      const purchaseReturn = checkPurchaseReturnResults.find(pr => pr.purchaseId === purchase.id);

      const mergedObject = {
          purchaseId: purchase.id,
          supplierId: purchase.supplierId,
          totalBill: purchase.totalBill,
          due: purchase.due,
          yourBalanceAdded: purchase.yourBalanceAdded,
          paidAmount: purchase.paidAmount,
          totalReturnProductPrice: purchaseReturn ? purchaseReturn.totalReturnProductPrice : 0,
          previousDue: supplier ? supplier.previousDue : 0,
          purchaseDue: supplier ? supplier.purchaseDue : 0,
          yourBalance: supplier ? supplier.yourBalance : 0
      };

      mergedResults.push(mergedObject);
  });

  return mergedResults;
}
```

**Explanation**:
- **Purpose**: To merge data from purchase records, supplier information, and purchase returns into a single summary for each purchase.
- **Logic**:
    - **Find Matches**: For each purchase, locate the corresponding supplier and purchase return based on `supplierId` and `purchaseId`.
    - **Create Merged Object**: Construct an object containing purchase details and any available supplier and return information.
    - **Push to Results**: Add the merged object to the results array.
    - **Return**: An array of merged objects representing the consolidated view of each purchase.

---

### Real-World Example

Imagine an accounting system where you need to generate a report that includes detailed information about each purchase, including related returns and supplier data. The `mergeData` function helps achieve this by combining all relevant data into a single summary.

#### Example Data
```javascript
const checkSupplierResults = [
  { id: 10, previousDue: 10, purchaseDue: 0, yourBalance: 125},
  { id: 11, previousDue: 10, purchaseDue: 0, yourBalance: 135}
];

const checkPurchaseResults = [
  { id: 885, supplierId: 11, totalBill: 32.5, paidAmount: 70, due: 0, yourBalanceAdded: 37.5 },
  { id: 886, supplierId: 11, totalBill: 62.5, paidAmount: 150, due: 0, yourBalanceAdded: 87.5 },
  { id: 887, supplierId: 10, totalBill: 15, paidAmount: 60, due: 0, yourBalanceAdded: 45 },
  { id: 888, supplierId: 10, totalBill: 30, paidAmount: 100, due: 0, yourBalanceAdded: 70 }
];

const checkPurchaseReturnResults = [
  { purchaseId: 885, supplierId: 11, totalReturnProductPrice: 42.5 },
  { purchaseId: 886, supplierId: 11, totalReturnProductPrice: 62.5 },
  { purchaseId: 887, supplierId: 10, totalReturnProductPrice: 50 },
  { purchaseId: 888, supplierId: 10, totalReturnProductPrice: 30 }
];
```

**Output of Merging**:
```javascript
const mergedData = mergeData(checkSupplierResults, checkPurchaseResults, checkPurchaseReturnResults);
console.log(mergedData);
```

#### Output:
```json
[
  {
    "purchaseId": 885,
    "supplierId": 11,
    "totalBill": 32.5,
    "due": 0,
    "yourBalanceAdded": 37.5,
    "paidAmount": 70,
    "totalReturnProductPrice": 42.5,
    "previousDue": 10,
    "purchaseDue": 0,
    "yourBalance": 135
  },
  {
    "purchaseId": 886,
    "supplierId": 11,
    "totalBill": 62.5,
    "due": 0,
    "yourBalanceAdded": 87.5,
    "paidAmount": 150,
    "totalReturnProductPrice": 62.5,
    "previousDue": 10,
    "purchaseDue": 0,
    "yourBalance": 135
  },
  {
    "purchaseId": 887,
    "supplierId": 10,
    "totalBill": 15,
    "due": 0,
    "yourBalanceAdded": 45,
    "paidAmount": 60,
    "totalReturnProductPrice": 50,
    "previousDue": 10,
    "purchaseDue": 0,
    "yourBalance": 125
  },
  {
    "purchaseId": 888,
    "supplierId": 10,
    "totalBill": 30,
    "due": 0,
    "yourBalanceAdded": 70,
    "paidAmount": 100,
    "totalReturnProductPrice": 30,
    "previousDue": 10,
    "purchaseDue": 0,
    "yourBalance": 125
  }
]
```

**Comment**:
- **`totalReturnProductPrice`**: Includes the return amount for each purchase.
- **`previousDue`, `purchaseDue`, `yourBalance`**: Derived from the supplier data if available.

---

### Similar Problem Questions

#### Question 1:
**How can we merge and summarize data from different sources to generate a consolidated report?**

<details>
  <summary>Answer</summary>
  Use a function similar to `mergeData` to match and combine records from multiple data sources. This involves finding corresponding entries and creating a merged summary for each record.
</details>

#### Question 2:
**How do we handle cases where data might be missing from some sources while merging?**

<details>
  <summary>Answer</summary>
  Implement logic to handle missing data by using conditional checks. Ensure default values are provided if data is not found in some sources, as demonstrated in the `mergeData` function.
</details>

---

### Output and Comments

```javascript
const mergedData = mergeData(checkSupplierResults, checkPurchaseResults, checkPurchaseReturnResults);
console.log(mergedData);
```

**Comment**:
- The `mergeData` function successfully combines purchase details with supplier and return information.
- The resulting output provides a comprehensive view of each purchase, including associated supplier details and return values.

