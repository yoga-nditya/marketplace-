package routes

import (
	"github.com/gofiber/fiber/v2"
	"marketplace-backend/src/controller"
)

func SetupCategoryRoutes(api fiber.Router) {
	api.Get("/categories", controller.GetCategories)
}
