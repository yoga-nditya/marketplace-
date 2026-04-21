package routes

import (
	"github.com/gofiber/fiber/v2"
	"marketplace-backend/src/controller"
)

func SetupBannerRoutes(api fiber.Router) {
	api.Get("/banners", controller.GetBanners)
}
