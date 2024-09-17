
## Data Validation for Purchase Quantities

### Table of Contents
1. [Introduction](#introduction)
2. [Function Explanation](#function-explanation)
3. [Example Usage](#example-usage)
4. [Output and Comments](#output-and-comments)
5. [Similar Problem Questions](#similar-problem-questions)

---

### Introduction

The `validatePurchaseData` function checks for consistency between frontend purchase data and database purchase data. It verifies whether the returned quantities and sub-quantities in the frontend data match those in the database. If discrepancies are found, the function returns an error message.

---

### Function Explanation

The `validatePurchaseData` function performs the following steps:

1. **Iterate through Frontend Data**:
   - Loops through each product in `frontendData`.

2. **Find Matching Product**:
   - Searches for a product in `databaseData` that matches the `productId` from `frontendData`.

3. **Validate Quantities**:
   - Compares `previousReturnedQuantity` and `previousReturnedSubQuantity` from `frontendData` with `returnedQuantity` and `returnedSubQuantity` from `databaseData`.
   - If there is a mismatch, the function returns an error.

4. **Return Result**:
   - If all products pass validation, the function returns `null` indicating no errors.

#### `validatePurchaseData` Function
```javascript
const validatePurchaseData = (frontendData, databaseData) => {
  // Iterate through each product in the frontend data
  for (const frontendProduct of frontendData) {
    // Find the corresponding product in the database data by matching productId
    const matchingProduct = databaseData.find((dbProduct) => dbProduct.productId === frontendProduct.productId);

    if (matchingProduct) {
      // Validate the returned quantity and sub-quantity against the frontend data
      const isQuantityMatching = frontendProduct.previousReturnedQuantity === matchingProduct.returnedQuantity;
      const isSubQuantityMatching = frontendProduct.previousReturnedSubQuantity === matchingProduct.returnedSubQuantity;

      // If any field does not match, return an error
      if (!isQuantityMatching || !isSubQuantityMatching) {
        return { error: 'One or more products have mismatched quantities! Please reset the page.' };
      }
    }
  }

  // If all validations pass, return null (no error)
  return null;
};
```

**Explanation**:
- **Purpose**: To ensure that the returned quantities and sub-quantities from the frontend match those in the database.
- **Logic**:
  - **Iteration**: Check each product in the frontend data against the database.
  - **Validation**: Compare the returned quantities and sub-quantities. Return an error if mismatches are found.
  - **Result**: Return `null` if no discrepancies are detected, otherwise return an error message.

---

### Example Usage

Consider a scenario where you need to validate frontend purchase data against the updated database information.

#### Example Data
```javascript
const frontendPurchaseData = [
  {
    product: 'new-1 - QG6PM1SV',
    id: 29,
    productId: 29,
    purchasePrice: 10,
    salePrice: 20,
    mainUnit: 'pc',
    purchaseId: 874,
    purchaseReturnId: 258,
    previousReturnedQuantity: 4,
    previousReturnedSubQuantity: 0,
  },
  {
    product: 'new rice - 70R2A39J',
    id: 26,
    productId: 26,
    purchasePrice: 5,
    salePrice: 10,
    mainUnit: 'kg',
    purchaseId: 874,
    purchaseReturnId: 258,
    previousReturnedQuantity: 2,
    previousReturnedSubQuantity: 0,
  },
  {
    product: 'rice - 8633NORY',
    id: 25,
    productId: 25,
    purchasePrice: 10,
    salePrice: 20,
    mainUnit: 'kg',
    purchaseId: 874,
    purchaseReturnId: 258,
    previousReturnedQuantity: 3,
    previousReturnedSubQuantity: 0,
  },
  {
    product: 'another-rice - 8633Y',
    id: 33,
    productId: 33,
    purchasePrice: 10,
    salePrice: 20,
    mainUnit: 'kg',
    purchaseId: 874,
    purchaseReturnId: 258,
    previousReturnedQuantity: 5,
    previousReturnedSubQuantity: 0,
  },
];

const updatedDataBasePurchaseData = [
  {
    product: 'new rice - 70R2A39J',
    id: 26,
    productId: 26,
    purchasePrice: 5,
    salePrice: 10,
    mainUnit: 'kg',
    purchaseId: 874,
    purchaseReturnId: 258,
    returnedQuantity: 2,
    returnedSubQuantity: 0,
  },
  {
    product: 'another-rice - 8633Y',
    id: 34,
    productId: 33,
    purchasePrice: 10,
    salePrice: 20,
    mainUnit: 'kg',
    purchaseId: 874,
    purchaseReturnId: 258,
    returnedQuantity: 5,
    returnedSubQuantity: 0,
  },
  {
    product: 'new-1 - QG6PM1SV',
    id: 29,
    productId: 29,
    purchasePrice: 10,
    salePrice: 20,
    mainUnit: 'pc',
    purchaseId: 874,
    purchaseReturnId: 258,
    returnedQuantity: 4,
    returnedSubQuantity: 0,
  },
];

// Run the validation function
const validationResult = validatePurchaseData(frontendPurchaseData, updatedDataBasePurchaseData);

if (validationResult) {
  console.log(validationResult.error);
} else {
  console.log('Data validation passed!');
}
```

**Output**:
```plaintext
Data validation passed!
```

**Comment**:
- **Success**: The function will print "Data validation passed!" if all quantities match.
- **Error**: If there are discrepancies, an error message will be returned indicating mismatches.

---

### Similar Problem Questions

#### Question 1:
**How can we ensure that frontend data matches the backend data during validation?**

<details>
  <summary>Answer</summary>
  Implement a function that compares specific fields (such as quantities) between frontend and backend data. Return an error if discrepancies are detected and handle the validation results accordingly.
</details>

#### Question 2:
**What approach should be taken when validating data integrity between two sources?**

<details>
  <summary>Answer</summary>
  Use validation functions to compare key data fields between the two sources. Ensure that all critical data matches and handle mismatches by providing meaningful error messages or corrective actions.
</details>

