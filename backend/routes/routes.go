package routes

import (
	"github.com/gofiber/fiber/v2"
	srcRoutes "marketplace-backend/src/routes"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")

	srcRoutes.SetupBannerRoutes(api)
	srcRoutes.SetupCategoryRoutes(api)

	api.Get("/hello", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Halo dari Golang Fiber!",
		})
	})
}
