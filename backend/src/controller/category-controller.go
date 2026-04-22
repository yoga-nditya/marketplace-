package controller

import (
	"marketplace-backend/src/service"

	"github.com/gofiber/fiber/v2"
)

func GetCategories(c *fiber.Ctx) error {
	categories, err := service.GetAllCategories()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "internal server error",
		})
	}

	if len(categories) == 0 {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"Categorydata": []any{},
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"Categorydata": categories,
	})
}
