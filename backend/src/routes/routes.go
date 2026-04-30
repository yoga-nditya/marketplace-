package routes

import (
	"marketplace-backend/src/controller"
	admin_controller "marketplace-backend/src/controller/admin"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")

	api.Get("/banners", controller.GetBanners)
	api.Get("/categories", controller.GetCategories)
	api.Get("/categories/:id", controller.GetCategoryByID)
	api.Get("/products", controller.GetProducts)
	api.Get("/products/:id", controller.GetProductByID)
	api.Post("/register", controller.Register)
	api.Post("/login", controller.Login)

	admin := api.Group("/admin")
	admin.Get("/categories", admin_controller.GetCategoriesAdmin)
	admin.Get("/categories/:id", admin_controller.GetCategoryByID)
	admin.Post("/categories", admin_controller.CreateCategory)
	admin.Put("/categories/:id", admin_controller.UpdateCategory)
	admin.Delete("/categories/:id", admin_controller.DeleteCategory)
}
