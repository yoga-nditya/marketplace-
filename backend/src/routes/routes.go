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
	api.Get("/products", controller.GetProducts)
	api.Post("/register", controller.Register)
	api.Post("/login", controller.Login)

	admin := api.Group("/admin")
	admin.Get("/categories", admin_controller.GetCategoriesAdmin)
	admin.Get("/category/:id", admin_controller.GetCategoryByID)
	admin.Post("/category", admin_controller.CreateCategory)
	admin.Put("/category/:id", admin_controller.UpdateCategory)
	admin.Delete("/category/:id", admin_controller.DeleteCategory)
}
