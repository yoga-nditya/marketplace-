package routes

import (
	"marketplace-backend/src/banner/controller"
	"github.com/gofiber/fiber/v2"
)

func SetupBannerRoutes(api fiber.Router) {
	banner := api.Group("/banners")
	banner.Get("/", controller.GetBanners)
}
