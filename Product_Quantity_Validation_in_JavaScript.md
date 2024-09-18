## Product Quantity Validation in JavaScript

### Table of Contents
1. [Introduction](#introduction)
2. [Code Explanation](#code-explanation)
3. [Sample Data](#sample-data)
4. [Output and Comments](#output-and-comments)
5. [Similar Problem Questions](#similar-problem-questions)

---

### Introduction

This documentation explains the `validateProductQuantities` function, which checks the consistency of product quantities between two datasets: `productData` and `stockProductRelationResults`. This function ensures that the quantities in the product data match the stock data, taking into account conversion factors (like kilograms to grams) for products with sub-units.

---

### Code Explanation

#### `validateProductQuantities` Function

```javascript
const validateProductQuantities = (productData, stockProductRelationResults) => {
  for (const product of productData) {
    const stockProduct = stockProductRelationResults.find(
      (item) => item.productId === product.productId
    );

    if (!stockProduct) {
      return { error: `Error: Product with productId ${product.productId} not found in stock data.` };
    }

    // Calculate total quantity for the product data
    let totalQuantityProductData = product.quantity;
    if (product.subUnit && product.relatedByValue) {
      totalQuantityProductData = product.quantity * product.relatedByValue + product.subQuantity;
    }

    // Calculate total quantity for the stock data
    let totalQuantityStock = stockProduct.quantity;
    if (product.subUnit && product.relatedByValue) {
      totalQuantityStock = stockProduct.quantity * product.relatedByValue + stockProduct.subquantity;
    }

    // Compare the total quantities between product data and stock data
    if (totalQuantityProductData !== totalQuantityStock) {
      return { error: `Error: Quantity mismatch for productId ${product.productId}. Product quantity: ${totalQuantityProductData}, Stock quantity: ${totalQuantityStock}.` };
    }
  }

  return true;
};
```

**Explanation**:
1. **Loop Through Products**: The function iterates through the `productData` array and searches for a matching product in `stockProductRelationResults` using `productId`.
2. **Check Product Availability**: If no matching stock data is found, the function returns an error specifying that the product is missing from stock.
3. **Total Quantity Calculation**:
   - If the product has a `subUnit` (such as kilograms to grams) and a conversion factor (`relatedByValue`), the total quantity is calculated as:
     \[
     \text{totalQuantityProductData} = \text{quantity} \times \text{relatedByValue} + \text{subQuantity}
     \]
   - The same calculation is applied to the stock data.
4. **Quantity Comparison**: The function compares the total quantities between the product data and stock data. If they don't match, an error message is returned.
5. **Return Success**: If all products pass the check, the function returns `true`.

---

### Sample Data

#### `productData`

The `productData` array contains information about the products being validated. Each product has fields like `quantity`, `subQuantity`, `mainUnit`, `subUnit`, and `relatedByValue`.

```javascript
const productData = [
  {
    purchaseId: 1029,
    id: 45,
    productId: 45,
    productName: 'new-1',
    productNameAndCode: 'new-1 - 58OMJJ8O',
    purchasePrice: 10,
    salePrice: 20,
    quantity: 10,
    subQuantity: 0,
    returnedQuantity: 0,
    returnedSubQuantity: 0,
    mainUnit: 'pc',
    subUnit: null,
    relatedByValue: null
  },
  {
    purchaseId: 1029,
    id: 46,
    productId: 46,
    productName: 'rice',
    productNameAndCode: 'rice - IHTHK792',
    purchasePrice: 10,
    salePrice: 20,
    quantity: 2,
    subQuantity: 499,
    returnedQuantity: 0,
    returnedSubQuantity: 0,
    mainUnit: 'kg',
    subUnit: 'gm',
    relatedByValue: 1000 // 1 kg = 1000 gm
  }
];
```

#### `stockProductRelationResults`

This array represents the stock data that will be compared with the `productData`.

```javascript
const stockProductRelationResults = [
  { productId: 45, quantity: 10, subquantity: 0, purchasePrice: 10 },
  { productId: 46, quantity: 2, subquantity: 500, purchasePrice: 10 }
];
```

---

### Output and Comments

#### Function Call
```javascript
console.log(validateProductQuantities(productData, stockProductRelationResults));
```

#### Output:
- **Success Case**:
  ```javascript
  true
  ```

- **Error Case (if quantities mismatch)**:
  ```javascript
  { error: "Error: Quantity mismatch for productId 46. Product quantity: 2499, Stock quantity: 2500." }
  ```

**Comments**:
- If the quantities match between the `productData` and `stockProductRelationResults`, the function returns `true`.
- If any product’s quantities mismatch, the function will return an error message specifying the mismatch.

---

### Similar Problem Questions

#### Question 1:
**How do I validate if the product quantity in my dataset matches the stock quantity?**

<details>
  <summary>Answer</summary>
  Use the `validateProductQuantities` function. It checks for matching `productId` and compares both `quantity` and `subQuantity` between two datasets.
</details>

#### Question 2:
**What happens if a product has sub-units like kilograms to grams?**

<details>
  <summary>Answer</summary>
  The function accounts for sub-units using the `relatedByValue` field. It calculates the total quantity by multiplying the main unit (`quantity`) by `relatedByValue` and adding the `subQuantity`.
</details>

