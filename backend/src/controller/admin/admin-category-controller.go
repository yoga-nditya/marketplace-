package admin_controller

import (
	"fmt"
	admin_service "marketplace-backend/src/service/admin"
	"path/filepath"
	"time"

	"github.com/gofiber/fiber/v2"
)

func GetCategoriesAdmin(c *fiber.Ctx) error {
	categories, err := admin_service.GetAllCategoriesAdmin()
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
	category, err := admin_service.GetCategoryByID(id)
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

func CreateCategory(c *fiber.Ctx) error {
	var name, slug string

	// Handle JSON body
	var body struct {
		Name string `json:"name"`
		Slug string `json:"slug"`
	}
	if err := c.BodyParser(&body); err == nil {
		name = body.Name
		slug = body.Slug
	}

	// Override with Form values if available
	if c.FormValue("name") != "" {
		name = c.FormValue("name")
	}
	if c.FormValue("slug") != "" {
		slug = c.FormValue("slug")
	}

	file, err := c.FormFile("image")
	var imageName string
	if err == nil {
		imageName = fmt.Sprintf("%d%s", time.Now().UnixNano(), filepath.Ext(file.Filename))
		if err := c.SaveFile(file, "./assets/category/"+imageName); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(struct {
				Success bool   `json:"success"`
				Message string `json:"message"`
			}{
				Success: false,
				Message: "gagal menyimpan gambar",
			})
		}
	}

	category, err := admin_service.CreateCategory(name, imageName, slug)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(struct {
			Success bool   `json:"success"`
			Message string `json:"message"`
		}{
			Success: false,
			Message: err.Error(),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(struct {
		Success      bool        `json:"success"`
		Message      string      `json:"message"`
		Categorydata interface{} `json:"Categorydata"`
	}{
		Success:      true,
		Message:      "data kategori berhasil ditambahkan",
		Categorydata: category,
	})
}

func UpdateCategory(c *fiber.Ctx) error {
	id := c.Params("id")
	var name, slug string

	// Handle JSON body
	var body struct {
		Name string `json:"name"`
		Slug string `json:"slug"`
	}
	if err := c.BodyParser(&body); err == nil {
		name = body.Name
		slug = body.Slug
	}

	// Override with Form values if available
	if c.FormValue("name") != "" {
		name = c.FormValue("name")
	}
	if c.FormValue("slug") != "" {
		slug = c.FormValue("slug")
	}

	file, err := c.FormFile("image")
	var imageName string
	if err == nil {
		imageName = fmt.Sprintf("%d%s", time.Now().UnixNano(), filepath.Ext(file.Filename))
		if err := c.SaveFile(file, "./assets/category/"+imageName); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(struct {
				Success bool   `json:"success"`
				Message string `json:"message"`
			}{
				Success: false,
				Message: "gagal menyimpan gambar baru",
			})
		}
	}

	category, err := admin_service.UpdateCategory(id, name, imageName, slug)
	if err != nil {
		if err.Error() == "kategori tidak ditemukan" {
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
		return c.Status(fiber.StatusBadRequest).JSON(struct {
			Success bool   `json:"success"`
			Message string `json:"message"`
		}{
			Success: false,
			Message: err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(struct {
		Success      bool        `json:"success"`
		Message      string      `json:"message"`
		Categorydata interface{} `json:"Categorydata"`
	}{
		Success:      true,
		Message:      "data kategori berhasil di update",
		Categorydata: category,
	})
}

func DeleteCategory(c *fiber.Ctx) error {
	id := c.Params("id")

	if err := admin_service.DeleteCategory(id); err != nil {
		if err.Error() == "kategori tidak ditemukan" {
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
		return c.Status(fiber.StatusInternalServerError).JSON(struct {
			Success bool   `json:"success"`
			Message string `json:"message"`
		}{
			Success: false,
			Message: err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(struct {
		Success      bool        `json:"success"`
		Message      string      `json:"message"`
		Categorydata interface{} `json:"Categorydata"`
	}{
		Success:      true,
		Message:      "data kategori berhasil dihapus",
		Categorydata: fiber.Map{"id": id},
	})
}
