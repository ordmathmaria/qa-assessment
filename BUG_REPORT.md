## Bug 1: Checkout form does not allow completing purchase with problem_user

**Severity:** Critical  
**User(s) affected:** problem_user  
**Environment:** Chrome, Windows / macOS (any modern browser)

---

### Steps to Reproduce
1. Go to https://www.saucedemo.com  
2. Login with user: problem_user  
3. Add any product to the cart  
4. Go to Cart  
5. Click Checkout  
6. Enter valid first name  
7. Enter last name  

---

### Expected Result
User should be able to enter first name, last name and continue checkout without losing any input data.

---

### Actual Result
When entering the last name, the first name field is automatically cleared, preventing the user from completing the form and finishing the purchase.

---

### Evidence
Bug recorded with Jam.dev: https://jam.dev/c/e0b61af9-f3dd-48da-872d-a9dab35dcd24

---

### Notes
This suggests a state management issue in the checkout form (likely controlled inputs overwriting each other or shared state binding between fields). This breaks a critical e-commerce flow and blocks checkout completion entirely.




## Bug 2: All products display the same incorrect image

**Severity:** Medium  
**User(s) affected:** problem_user  
**Environment:** Chrome, Windows / macOS (any modern browser)

---

### Steps to Reproduce
1. Go to https://www.saucedemo.com  
2. Login with user: problem_user  
3. Navigate to the Products page  
4. Observe the images displayed for all products  

---

### Expected Result
Each product should display its own unique image that matches the product name and description.

---

### Actual Result
All products display the same image, regardless of the product name or description. There is no variation between items, making it impossible to visually distinguish products.

---

### Evidence
Bug recorded with Jam.dev: https://jam.dev/c/ba91ed65-063c-47cb-b2cb-73e7f434cf88

---

### Notes
This suggests a broken image mapping or a fallback image being applied globally to all products instead of individual assets. This impacts user experience and product differentiation but does not block functionality.