package admin_controller

import (
	"fmt"
	"marketplace-backend/src/model"
	admin_service "marketplace-backend/src/service/admin"
	"path/filepath"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
)

func GetProductsAdmin(c *fiber.Ctx) error {
	id := c.Query("id")

	if id != "" {
		product, err := admin_service.GetProductByID(id)
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
			Productdata: []model.ProductAdmin{product},
		})
	}

	products, err := admin_service.GetAllProductsAdmin()
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

func CreateProduct(c *fiber.Ctx) error {
	var p model.ProductAdmin

	if err := c.BodyParser(&p); err != nil {
	}

	if c.FormValue("name") != "" {
		p.Name = c.FormValue("name")
	}
	if c.FormValue("categories_id") != "" {
		p.CategoriesID = c.FormValue("categories_id")
	}
	if c.FormValue("price") != "" {
		val, _ := strconv.ParseUint(c.FormValue("price"), 10, 32)
		p.Price = uint(val)
	}
	if c.FormValue("capital_price") != "" {
		val, _ := strconv.ParseUint(c.FormValue("capital_price"), 10, 32)
		p.CapitalPrice = uint(val)
	}
	if c.FormValue("description") != "" {
		p.Description = c.FormValue("description")
	}
	if c.FormValue("weight") != "" {
		val, _ := strconv.ParseUint(c.FormValue("weight"), 10, 32)
		p.Weight = uint(val)
	}
	if c.FormValue("stock_amount") != "" {
		val, _ := strconv.ParseUint(c.FormValue("stock_amount"), 10, 32)
		p.StockAmount = uint(val)
	}
	if c.FormValue("minimum_order") != "" {
		val, _ := strconv.ParseUint(c.FormValue("minimum_order"), 10, 32)
		p.MinimumOrder = uint(val)
	}
	if c.FormValue("slug") != "" {
		p.Slug = c.FormValue("slug")
	}

	file, err := c.FormFile("image")
	if err == nil {
		imageName := fmt.Sprintf("%d%s", time.Now().UnixNano(), filepath.Ext(file.Filename))
		if err := c.SaveFile(file, "./assets/product/"+imageName); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(struct {
				Success bool   `json:"success"`
				Message string `json:"message"`
			}{
				Success: false,
				Message: "gagal menyimpan gambar",
			})
		}
		p.Image = imageName
	}

	product, err := admin_service.CreateProduct(p)
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
		Success     bool        `json:"success"`
		Message     string      `json:"message"`
		Productdata interface{} `json:"Productdata"`
	}{
		Success:     true,
		Message:     "data product berhasil ditambahkan",
		Productdata: []model.ProductAdmin{product},
	})
}

func UpdateProduct(c *fiber.Ctx) error {
	id := c.Query("id")
	if id == "" {
		return c.Status(fiber.StatusBadRequest).JSON(struct {
			Success bool   `json:"success"`
			Message string `json:"message"`
		}{
			Success: false,
			Message: "id parameter is required",
		})
	}
	var p model.ProductAdmin

	if err := c.BodyParser(&p); err != nil {
	}
	p.ID = id

	if c.FormValue("name") != "" {
		p.Name = c.FormValue("name")
	}
	if c.FormValue("categories_id") != "" {
		p.CategoriesID = c.FormValue("categories_id")
	}
	if c.FormValue("price") != "" {
		val, _ := strconv.ParseUint(c.FormValue("price"), 10, 32)
		p.Price = uint(val)
	}
	if c.FormValue("capital_price") != "" {
		val, _ := strconv.ParseUint(c.FormValue("capital_price"), 10, 32)
		p.CapitalPrice = uint(val)
	}
	if c.FormValue("description") != "" {
		p.Description = c.FormValue("description")
	}
	if c.FormValue("weight") != "" {
		val, _ := strconv.ParseUint(c.FormValue("weight"), 10, 32)
		p.Weight = uint(val)
	}
	if c.FormValue("stock_amount") != "" {
		val, _ := strconv.ParseUint(c.FormValue("stock_amount"), 10, 32)
		p.StockAmount = uint(val)
	}
	if c.FormValue("minimum_order") != "" {
		val, _ := strconv.ParseUint(c.FormValue("minimum_order"), 10, 32)
		p.MinimumOrder = uint(val)
	}
	if c.FormValue("slug") != "" {
		p.Slug = c.FormValue("slug")
	}

	file, err := c.FormFile("image")
	if err == nil {
		imageName := fmt.Sprintf("%d%s", time.Now().UnixNano(), filepath.Ext(file.Filename))
		if err := c.SaveFile(file, "./assets/product/"+imageName); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(struct {
				Success bool   `json:"success"`
				Message string `json:"message"`
			}{
				Success: false,
				Message: "gagal menyimpan gambar baru",
			})
		}
		p.Image = imageName
	}

	product, err := admin_service.UpdateProduct(p)
	if err != nil {
		if err.Error() == "produk tidak ditemukan" {
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
		return c.Status(fiber.StatusBadRequest).JSON(struct {
			Success bool   `json:"success"`
			Message string `json:"message"`
		}{
			Success: false,
			Message: err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(struct {
		Success     bool        `json:"success"`
		Message     string      `json:"message"`
		Productdata interface{} `json:"Productdata"`
	}{
		Success:     true,
		Message:     "data product berhasil di update",
		Productdata: []model.ProductAdmin{product},
	})
}

func DeleteProduct(c *fiber.Ctx) error {
	id := c.Query("id")
	if id == "" {
		return c.Status(fiber.StatusBadRequest).JSON(struct {
			Success bool   `json:"success"`
			Message string `json:"message"`
		}{
			Success: false,
			Message: "id parameter is required",
		})
	}

	if err := admin_service.DeleteProduct(id); err != nil {
		if err.Error() == "produk tidak ditemukan" {
			return c.Status(fiber.StatusNotFound).JSON(struct {
				Success bool   `json:"success"`
				Message string `json:"message"`
			}{
				Success: false,
				Message: "data tidak ditemukan",
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
		Success bool   `json:"success"`
		Message string `json:"message"`
	}{
		Success: true,
		Message: "data product berhasil dihapus",
	})
}
