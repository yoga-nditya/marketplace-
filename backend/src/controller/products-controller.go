package controller

import (
	"marketplace-backend/src/service"

	"github.com/gofiber/fiber/v2"
)

func GetProducts(c *fiber.Ctx) error {
	products, err := service.GetAllProducts()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(struct {
			Success bool   `json:"success"`
			Message string `json:"message"`
		}{
			Success: false,
			Message: "internal server error",
		})
	}

	if len(products) == 0 {
		return c.Status(fiber.StatusOK).JSON(struct {
			Success     bool        `json:"success"`
			Message     string      `json:"message"`
			Productdata interface{} `json:"Productdata"`
		}{
			Success:     false,
			Message:     "data tidak ditemukan",
			Productdata: fiber.Map{},
		})
	}

	return c.Status(fiber.StatusOK).JSON(struct {
		Success     bool        `json:"success"`
		Message     string      `json:"message"`
		Productdata interface{} `json:"Productdata"`
	}{
		Success:     true,
		Message:     "data berhasil ditemukan",
		Productdata: products,
	})
}

func GetProductByID(c *fiber.Ctx) error {
	id := c.Params("id")
	product, err := service.GetProductByID(id)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(struct {
			Success     bool        `json:"success"`
			Message     string      `json:"message"`
			Productdata interface{} `json:"Productdata"`
		}{
			Success:     false,
			Message:     "data tidak ditemukan",
			Productdata: fiber.Map{},
		})
	}

	return c.Status(fiber.StatusOK).JSON(struct {
		Success     bool        `json:"success"`
		Message     string      `json:"message"`
		Productdata interface{} `json:"Productdata"`
	}{
		Success:     true,
		Message:     "data berhasil ditemukan",
		Productdata: product,
	})
}
