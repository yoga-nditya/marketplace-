package routes

import (
	"github.com/gofiber/fiber/v2"
	bannerRoutes "marketplace-backend/src/routes"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")

	bannerRoutes.SetupBannerRoutes(api)

	api.Get("/hello", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Halo dari Golang Fiber!",
		})
	})
}
