package controller

import (
	"marketplace-backend/src/service"

	"github.com/gofiber/fiber/v2"
)

func GetBanners(c *fiber.Ctx) error {
	banners, err := service.GetAllBanners()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(struct {
			Success bool   `json:"success"`
			Message string `json:"message"`
		}{
			Success: false,
			Message: "internal server error",
		})
	}

	if len(banners) == 0 {
		return c.Status(fiber.StatusOK).JSON(struct {
			Success    bool        `json:"success"`
			Message    string      `json:"message"`
			Bannerdata interface{} `json:"Bannerdata"`
		}{
			Success:    false,
			Message:    "data tidak ditemukan",
			Bannerdata: fiber.Map{},
		})
	}

	return c.Status(fiber.StatusOK).JSON(struct {
		Success    bool        `json:"success"`
		Message    string      `json:"message"`
		Bannerdata interface{} `json:"Bannerdata"`
	}{
		Success:    true,
		Message:    "data berhasil ditemukan",
		Bannerdata: banners,
	})
}
