package controller

import (
	"marketplace-backend/src/banner/service"
	"github.com/gofiber/fiber/v2"
)

func GetBanners(c *fiber.Ctx) error {
	banners, err := service.GetAllBanners()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"message": "Gagal mengambil data banner",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success": true,
		"data":    banners,
	})
}
