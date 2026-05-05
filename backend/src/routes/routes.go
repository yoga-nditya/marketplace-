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
	admin.Post("/categories", admin_controller.CreateCategory)
	admin.Put("/categories", admin_controller.UpdateCategory)
	admin.Delete("/categories", admin_controller.DeleteCategory)

	admin.Get("/products", admin_controller.GetProductsAdmin)
	admin.Post("/products", admin_controller.CreateProduct)
	admin.Put("/products", admin_controller.UpdateProduct)
	admin.Delete("/products", admin_controller.DeleteProduct)

	admin.Get("/banners", admin_controller.GetBannersAdmin)
	admin.Post("/banners", admin_controller.CreateBanner)
	admin.Put("/banners", admin_controller.UpdateBanner)
	admin.Delete("/banners", admin_controller.DeleteBanner)
}
