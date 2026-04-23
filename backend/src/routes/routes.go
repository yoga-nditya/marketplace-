package routes

import (
	"marketplace-backend/src/controller"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")

	api.Get("/banners", controller.GetBanners)
	api.Get("/categories", controller.GetCategories)
	api.Get("/products", controller.GetProducts)
	api.Post("/register", controller.Register)
	api.Post("/login", controller.Login)
}
