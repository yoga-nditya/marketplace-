package controller

import (
	"marketplace-backend/src/service"

	"github.com/gofiber/fiber/v2"
)

func GetProducts(c *fiber.Ctx) error {
	products, err := service.GetAllProducts()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "internal server error",
		})
	}

	if len(products) == 0 {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"Productdata": []any{},
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"Productdata": products,
	})
}
