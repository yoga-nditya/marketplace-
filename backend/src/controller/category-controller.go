package controller

import (
	"marketplace-backend/src/service"

	"github.com/gofiber/fiber/v2"
)

func GetCategories(c *fiber.Ctx) error {
	categories, err := service.GetAllCategories()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(struct {
			Success bool   `json:"success"`
			Message string `json:"message"`
		}{
			Success: false,
			Message: "internal server error",
		})
	}

	if len(categories) == 0 {
		return c.Status(fiber.StatusOK).JSON(struct {
			Success      bool        `json:"success"`
			Message      string      `json:"message"`
			Categorydata interface{} `json:"Categorydata"`
		}{
			Success:      false,
			Message:      "data tidak ditemukan",
			Categorydata: fiber.Map{},
		})
	}

	return c.Status(fiber.StatusOK).JSON(struct {
		Success      bool        `json:"success"`
		Message      string      `json:"message"`
		Categorydata interface{} `json:"Categorydata"`
	}{
		Success:      true,
		Message:      "data berhasil ditemukan",
		Categorydata: categories,
	})
}

func GetCategoryByID(c *fiber.Ctx) error {
	id := c.Params("id")
	category, err := service.GetCategoryByID(id)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(struct {
			Success      bool        `json:"success"`
			Message      string      `json:"message"`
			Categorydata interface{} `json:"Categorydata"`
		}{
			Success:      false,
			Message:      "data tidak ditemukan",
			Categorydata: fiber.Map{},
		})
	}

	return c.Status(fiber.StatusOK).JSON(struct {
		Success      bool        `json:"success"`
		Message      string      `json:"message"`
		Categorydata interface{} `json:"Categorydata"`
	}{
		Success:      true,
		Message:      "data berhasil ditemukan",
		Categorydata: category,
	})
}
