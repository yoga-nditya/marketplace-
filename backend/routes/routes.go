package routes

import (
	srcRoutes "marketplace-backend/src/routes"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")

	srcRoutes.SetupBannerRoutes(api)
	srcRoutes.SetupCategoryRoutes(api)
}
