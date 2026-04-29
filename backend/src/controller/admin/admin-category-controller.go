package admin_controller

import (
	admin_service "marketplace-backend/src/service/admin"

	"github.com/gofiber/fiber/v2"
)

func GetCategoriesAdmin(c *fiber.Ctx) error {
	categories, err := admin_service.GetAllCategoriesAdmin()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"message": "internal server error",
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"Categorydata": categories,
	})
}

func GetCategoryByID(c *fiber.Ctx) error {
	id := c.Params("id")
	category, err := admin_service.GetCategoryByID(id)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"success": false,
			"message": "kategori tidak ditemukan",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"Categorydata": category,
	})
}

func CreateCategory(c *fiber.Ctx) error {
	var body struct {
		Name  string `json:"name"`
		Image string `json:"image"`
		Slug  string `json:"slug"`
	}

	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"message": "error bad request",
		})
	}

	if err := admin_service.CreateCategory(body.Name, body.Image, body.Slug); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"message": "kategori gagal ditambahkan",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"success": true,
		"message": "kategori berhasil ditambahkan",
	})
}

func UpdateCategory(c *fiber.Ctx) error {
	id := c.Params("id")
	var body struct {
		Name  string `json:"name"`
		Image string `json:"image"`
		Slug  string `json:"slug"`
	}

	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"message": "error bad request",
		})
	}

	if err := admin_service.UpdateCategory(id, body.Name, body.Image, body.Slug); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"message": "data gagal di update",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success": true,
		"message": "data kategori berhasil di update",
	})
}

func DeleteCategory(c *fiber.Ctx) error {
	id := c.Params("id")

	if err := admin_service.DeleteCategory(id); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"message": "data kategori gagal dihapus",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success": true,
		"message": "data kategori berhasil dihapus",
	})
}
