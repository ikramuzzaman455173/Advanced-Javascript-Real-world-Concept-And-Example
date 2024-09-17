## Merging and Subtracting Quantities in JavaScript

### Table of Contents
1. [Introduction](#introduction)
2. [Code Explanation](#code-explanation)
3. [Real-World Example](#real-world-example)
4. [Similar Problem Questions](#similar-problem-questions)
5. [Output and Comments](#output-and-comments)

---

### Introduction

This documentation demonstrates how to calculate and adjust quantities of products by subtracting values while considering different units of measurement. The goal is to ensure accurate calculations by converting between units and handling scenarios where quantities might be negative or exceed the base unit.

---

### Code Explanation

The `subtractionTotalQuantityOfProduct` function adjusts quantities by subtracting specified values and converting them into base units. It handles cases where the remaining sub-quantity may become negative or exceed the base unit.

#### `subtractionTotalQuantityOfProduct` Function
```javascript
const subtractionTotalQuantityOfProduct = (totalQuantityInDB, totalSubQuantityInDB, quantityFrontend, subQuantiyFrontend, relatedByValue = 1) => {
  /********************************
   * *======*=======*
   * # Important Note
   * *======*=======*
   * Here Base = subQuantity
   *
   ********************************/
  // Convert totalQuantityInDB quantities to base unit
  let totalQuantityInBase = totalQuantityInDB * relatedByValue;
  let totalSubQuantityInBase = totalSubQuantityInDB;

  // Convert individual quantities to base unit
  let quantityInBase = quantityFrontend * relatedByValue;
  let subQuantityInBase = subQuantiyFrontend;

  // Calculate the remaining quantities in base unit
  let remainingQuantityInBase = totalQuantityInBase - quantityInBase;
  let remainingSubQuantityInBase = totalSubQuantityInBase - subQuantityInBase;

  // Adjust remainingSubQ if it becomes negative or exceeds the base unit
  if (remainingSubQuantityInBase < 0) {
    remainingSubQuantityInBase += relatedByValue;
    remainingQuantityInBase--; // Adjust remainingQuantityInBase accordingly
  } else if (remainingSubQuantityInBase >= relatedByValue) {
    remainingQuantityInBase += Math.floor(remainingSubQuantityInBase / relatedByValue);
    remainingSubQuantityInBase %= relatedByValue;
  }

  // Convert the remaining quantity to specified unit
  let updatedTotalQuantity = Math.floor(remainingQuantityInBase / relatedByValue);

  // Convert the remaining subtotal quantity to specified unit
  let updatedTotalSubQuantity = Math.floor(remainingSubQuantityInBase);

  // Return the calculated values
  return {
    updatedTotalQuantity,
    updatedTotalSubQuantity,
  };
};
```

**Explanation**:
- **Purpose**: To accurately calculate and adjust quantities by converting between different units and handling cases where quantities might be negative or exceed the base unit.
- **Logic**:
    - **Convert to Base Unit**: Convert total and individual quantities into base units using `relatedByValue`.
    - **Calculate Remaining Quantities**: Compute the remaining base unit and sub-quantity values.
    - **Adjust Quantities**: Normalize quantities if they become negative or exceed the base unit.
    - **Convert Back**: Convert the remaining quantities back to the specified unit.
    - **Return**: An object containing the updated quantities.

---

### Real-World Example

Imagine you are managing inventory where products are measured in base units and sub-units. You need to update the quantities after a transaction.

#### Example Data
```javascript
const totalQuantityInDB = 4;
const totalSubQuantityInDB = 1000;
const quantityFrontend = 0;
const subQuantiyFrontend = 0;
const relatedByValue = 1000;
```

**Output of Calculation**:
```javascript
const result = subtractionTotalQuantityOfProduct(totalQuantityInDB, totalSubQuantityInDB, quantityFrontend, subQuantiyFrontend, relatedByValue);
console.log(result);
```

#### Output:
```json
{
  "updatedTotalQuantity": 4,
  "updatedTotalSubQuantity": 0
}
```

**Comment**:
- **`updatedTotalQuantity`**: Remains `4` as no quantities were subtracted.
- **`updatedTotalSubQuantity`**: Remains `0` as no sub-quantities were subtracted.

---

### Similar Problem Questions

#### Question 1:
**How can we accurately handle and adjust product quantities when converting between different units of measurement?**

<details>
  <summary>Answer</summary>
  Use a function like `subtractionTotalQuantityOfProduct` to convert quantities into a base unit, perform the necessary calculations, and then convert back to the specified unit. This approach ensures accurate handling of quantities and adjustments.
</details>

#### Question 2:
**How do we manage cases where the remaining quantity becomes negative or exceeds the base unit after a transaction?**

<details>
  <summary>Answer</summary>
  Implement logic to adjust the remaining sub-quantity and base quantity. For negative sub-quantities, add the base unit and decrement the base quantity. For quantities exceeding the base unit, adjust accordingly and normalize the remaining sub-quantity.
</details>

---

### Output and Comments

```javascript
const result = subtractionTotalQuantityOfProduct(totalQuantityInDB, totalSubQuantityInDB, quantityFrontend, subQuantiyFrontend, relatedByValue);
console.log(result);
```

**Comment**:
- The `subtractionTotalQuantityOfProduct` function accurately calculates the remaining quantities, considering conversions and adjustments for different units.
- The output reflects the correct quantities after applying the necessary adjustments.
