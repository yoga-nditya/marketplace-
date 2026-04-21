package controller

import (
	"marketplace-backend/src/service"

	"github.com/gofiber/fiber/v2"
)

func GetBanners(c *fiber.Ctx) error {
	banners, err := service.GetAllBanners()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status": "error",
		})
	}

	if len(banners) == 0 {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"status": "success",
			"total":  0,
			"data":   []interface{}{},
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":     "success",
		"total":      len(banners),
		"Bannerdata": banners,
	})
}
