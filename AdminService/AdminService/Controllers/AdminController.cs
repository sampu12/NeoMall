using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Collections.Generic;
using AdminService.Models;
using System.Text.Json.Serialization;
using System.Text.Json;
using System.Reflection;
using System.Net;  // Needed for HttpStatusCode

namespace AdminService.Controllers
{
    public class AdminController : Controller
    {
        private readonly HttpClient _httpClient;

        public AdminController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public IActionResult Index()
        {
            if (HttpContext.Session.GetString("AdminUsername") == null)
                return RedirectToAction("Login");

            return View();
        }

        // Admin Login
        public IActionResult Login()
        {
            if (HttpContext.Session.GetString("AdminUsername") != null)
                return RedirectToAction("Index");

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(AdminLogin loginModel)
        {
            try
            {
                string url = $"http://localhost:2000/api/admins/validateAdmin/{loginModel.username}/{loginModel.password}";
                var response = await _httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    HttpContext.Session.SetString("AdminUsername", loginModel.username);

                    Console.WriteLine(HttpContext.Session.GetString("AdminUsername"));
                    return RedirectToAction("Index");
                }

                ViewBag.Error = "Invalid username or password!";
            }
            catch (Exception ex)
            {
                ViewBag.Error = "Error: " + ex.Message;
            }

            return View(loginModel);
        }


        // Admin Logout
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Login");
        }

        //User Management
        public async Task<IActionResult> UserManagement()
        {
            if (HttpContext.Session.GetString("AdminUsername") == null)
                return RedirectToAction("Login");

            var response = await _httpClient.GetAsync("http://localhost:3000/users/getAllUsers");

            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                var users = JsonConvert.DeserializeObject<List<User>>(json);
                return View(users);
            }

            ViewBag.Error = "Failed to fetch users.";
            return View(new List<User>());
        }

        // Search User
        [HttpGet]
        public async Task<IActionResult> SearchUser(string user_id)
        {
            if (HttpContext.Session.GetString("AdminUsername") == null)
                return RedirectToAction("Login");

            var response = await _httpClient.GetAsync($"http://localhost:3000/users/getUserByID/{user_id}");

            if (response.IsSuccessStatusCode)
            {
                var user = JsonConvert.DeserializeObject<User>(await response.Content.ReadAsStringAsync());
                return Json(new List<User> { user }); // Return as a list to match expected format
            }

            return Json(new List<User>()); // Return an empty list if user not found
        }

        // POST: Confirm Delete User
        [HttpPost]
            public async Task<IActionResult> DeleteUser(int id)
            {
                if (HttpContext.Session.GetString("AdminUsername") == null)
                    return RedirectToAction("Login");

                var response = await _httpClient.DeleteAsync($"http://localhost:3000/users/deleteUser/{id}");

                if (response.IsSuccessStatusCode)
                    return RedirectToAction("UserManagement");

                ViewBag.Error = "Failed to delete user.";
                return View();
            }

        public async Task<IActionResult> EditUser(int id)
        {
            if (HttpContext.Session.GetString("AdminUsername") == null)
                return RedirectToAction("Login");

            var response = await _httpClient.GetAsync($"http://localhost:3000/users/getUserByID/{id}");

            if (!response.IsSuccessStatusCode)
            {
                ViewBag.Error = "User not found.";
                return RedirectToAction("UserManagement");
            }

            var user = JsonConvert.DeserializeObject<User>(await response.Content.ReadAsStringAsync());

            // Convert User to ViewModel
            var editUserViewModel = new EditUserViewModel
            {
                user_id = user.user_id,
                name = user.name,
                email = user.email,
                password = user.password,
                mobile_number = user.mobile_number
            };

            return View(editUserViewModel);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateUser(EditUserViewModel editUser)
        {
            if (HttpContext.Session.GetString("AdminUsername") == null)
                return RedirectToAction("Login");

            if (!ModelState.IsValid)
            {
                return View("EditUser", editUser);
            }

            // Convert ViewModel to JSON
            var jsonContent = new StringContent(JsonConvert.SerializeObject(editUser), Encoding.UTF8, "application/json");
            var response = await _httpClient.PutAsync($"http://localhost:3000/users/updateUser/{editUser.user_id}", jsonContent);

            if (!response.IsSuccessStatusCode)
            {
                ViewBag.Error = "Failed to update user.";
                return View("EditUser", editUser);
            }

            return RedirectToAction("UserManagement");
        }


        // Product Management
        public async Task<IActionResult> ProductManagement()
        {

            if (HttpContext.Session.GetString("AdminUsername") == null)
                return RedirectToAction("Login");

            List<Product> products = new List<Product>();

            string javaMicroserviceUrl = "http://localhost:8083/product/getAll";

            try
            {
                HttpResponseMessage response = await _httpClient.GetAsync(javaMicroserviceUrl);
                if (response.IsSuccessStatusCode)
                {
                    string jsonData = await response.Content.ReadAsStringAsync();
                    products = JsonConvert.DeserializeObject<List<Product>>(jsonData);
                }
                else
                {
                    ModelState.AddModelError("", "Failed to fetch data from the Java microservice.");
                }
            }
            catch (HttpRequestException ex)
            {
                ModelState.AddModelError("", $"Error fetching data: {ex.Message}");
            }

            return View(products);
        }


        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            if (HttpContext.Session.GetString("AdminUsername") == null)
                return RedirectToAction("Login");

            try
            {
                var response = await _httpClient.GetAsync("http://localhost:8083/product/getAll");

                if (!response.IsSuccessStatusCode)
                {
                    return BadRequest(new { message = $"Failed to fetch products. Status Code: {response.StatusCode}" });
                }

                var json = await response.Content.ReadAsStringAsync();
                var products = JsonConvert.DeserializeObject<List<Product>>(json);

                if (products == null || products.Count == 0)
                {
                    return Ok(new { message = "No products available." });
                }

                return Json(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Error: {ex.Message}" });
            }
        }


        // Add Product
        public IActionResult AddProduct()
        {

            if (HttpContext.Session.GetString("AdminUsername") == null)
                return RedirectToAction("Login");

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct(Product product)
        {
            if (HttpContext.Session.GetString("AdminUsername") == null)
                return RedirectToAction("Login");

            if (!ModelState.IsValid)
            {
                return View(product);
            }

            var json = JsonConvert.SerializeObject(product);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync("http://localhost:8083/product/create", content);

            if (response.IsSuccessStatusCode)
            {
                return RedirectToAction("ProductManagement");
            }
            else if (response.StatusCode == HttpStatusCode.Conflict)
            {
                // Duplicate primary key detected
                ViewBag.Error = "A product with the same primary key already exists.";
            }
            else
            {
                ViewBag.Error = "Failed to add product. Please try again.";
            }

            // Return the view with the error message.
            return View(product);
        }

        [HttpGet]
        public async Task<IActionResult> SearchProduct(string query)
        {

            if (HttpContext.Session.GetString("AdminUsername") == null)
                return RedirectToAction("Login");

            try
            {
                // Ensure query is not null or empty
                if (string.IsNullOrWhiteSpace(query))
                {
                    return Json(new List<Product>());
                }

                // Send the request to the search endpoint with 'name' as the query parameter
                var response = await _httpClient.GetAsync($"http://localhost:8083/product/search?name={Uri.EscapeDataString(query)}");

                if (response.IsSuccessStatusCode)
                {
                    var jsonResponse = await response.Content.ReadAsStringAsync();
                    var products = JsonConvert.DeserializeObject<List<Product>>(jsonResponse);

                    return Json(products);
                }

                // Handle unsuccessful response
                Console.Error.WriteLine($"Error fetching products. Status code: {response.StatusCode}");
                return Json(new List<Product>());
            }
            catch (Exception ex)
            {
                // Handle exceptions
                Console.Error.WriteLine($"Exception occurred: {ex.Message}");
                return Json(new List<Product>());
            }
        }

        // Delete Product (POST)
        [HttpPost("/Admin/DeleteProduct/{categoryId}/{productId}")]
        public async Task<IActionResult> DeleteProduct(int categoryId, int productId)
        {

            if (HttpContext.Session.GetString("AdminUsername") == null)
                return RedirectToAction("Login");

            try
            {
                // Call the microservice to delete the product using DELETE request
                var response = await _httpClient.DeleteAsync($"http://localhost:8083/product/delete/{categoryId}/{productId}");

                if (response.IsSuccessStatusCode)
                {
                    // Redirect to the product management page after successful deletion
                    return RedirectToAction("ProductManagement");
                }

                // Show an error message if the deletion fails
                ViewBag.Error = "Failed to delete product. Please try again.";
            }
            catch (Exception ex)
            {
                // Log the error and show a general failure message
                ViewBag.Error = "An error occurred while attempting to delete the product. Please try again.";
                // Optionally log the exception for further investigation
                Console.Error.WriteLine(ex.Message);
            }

            return View();
        }

        [HttpGet("/Admin/EditProduct/{categoryId}/{productId}")]
        public async Task<IActionResult> EditProduct(int categoryId, int productId)
        {

            if (HttpContext.Session.GetString("AdminUsername") == null)
                return RedirectToAction("Login");

            // Call microservice API to get product details
            var response = await _httpClient.GetAsync($"http://localhost:8083/product/get/{categoryId}/{productId}");

            if (!response.IsSuccessStatusCode)
            {
                return View("Error", "Failed to fetch product details.");
            }

            var product = await response.Content.ReadFromJsonAsync<Product>();

            if (product == null)
            {
                return View("Error", "Product not found.");
            }

            return View("EditProduct", product); // Pass product to the view
        }

        [HttpPost]
        public async Task<IActionResult> UpdateProduct(Product product)
        {

            if (HttpContext.Session.GetString("AdminUsername") == null)
                return RedirectToAction("Login");

            if (!ModelState.IsValid)  // Check if the model is valid
            {
                return View(product);  // Return the view with validation errors
            }

            var response = await _httpClient.PutAsJsonAsync(
                $"http://localhost:8083/product/update/{product.productId.categoryId}/{product.productId.productId}",
                product
            );

            if (!response.IsSuccessStatusCode)
            {
                return View("Error", "Failed to update product.");
            }

            return RedirectToAction("ProductManagement");
        }

        // View Orders
        public async Task<IActionResult> ViewOrdersAsync()
        {
            if (HttpContext.Session.GetString("AdminUsername") == null)
                return RedirectToAction("Login");
            List<OrderResponse> orders = new List<OrderResponse>();

            try
            {
                string orderServiceUrl = "http://localhost:8081/order";

                HttpResponseMessage response = await _httpClient.GetAsync(orderServiceUrl);

                if (response.IsSuccessStatusCode)
                {
                    string jsonData = await response.Content.ReadAsStringAsync();
                    orders = JsonConvert.DeserializeObject<List<OrderResponse>>(jsonData);
                }
                else
                {
                    TempData["Error"] = $"Failed to fetch orders. Status Code: {response.StatusCode}";
                }
            }
            catch (Exception ex)
            {
                TempData["Error"] = $"Error while fetching orders: {ex.Message}";
            }

            return View(orders);
        }



        // Search Orders

        [HttpGet]
        public async Task<IActionResult> SearchOrder(string query)
        {
            if (HttpContext.Session.GetString("AdminUsername") == null)
                return RedirectToAction("Login");
            Console.WriteLine($"🔍 Searching for: {query}");

            string apiUrl = $"http://localhost:8081/order/search?query={query}";
            Console.WriteLine($"🌍 API Call: {apiUrl}");

            try
            {
                var response = await _httpClient.GetAsync(apiUrl);
                string responseBody = await response.Content.ReadAsStringAsync();

                Console.WriteLine($"📥 Raw Response: {responseBody}");  // Debugging log

                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"❌ API Error: {response.StatusCode} - {response.ReasonPhrase}");
                    return Json(new List<OrderResponse>());
                }

                // Handle potential null response
                var orders = JsonConvert.DeserializeObject<List<OrderResponse>>(responseBody) ?? new List<OrderResponse>();

                Console.WriteLine($"✅ Orders received: {orders.Count}");

                return Json(orders);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"🚨 Exception: {ex.Message}");
                return Json(new { error = "An error occurred while searching for orders." });
            }
        }
    }
}
