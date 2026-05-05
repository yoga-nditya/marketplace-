package admin_controller

import (
	"fmt"
	"marketplace-backend/src/model"
	admin_service "marketplace-backend/src/service/admin"
	"path/filepath"
	"time"

	"github.com/gofiber/fiber/v2"
)

func GetBannersAdmin(c *fiber.Ctx) error {
	id := c.Query("id")

	if id != "" {
		banner, err := admin_service.GetBannerByID(id)
		if err != nil {
			return c.Status(fiber.StatusNotFound).JSON(struct {
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
			Bannerdata: []model.BannerAdmin{banner},
		})
	}

	banners, err := admin_service.GetAllBannersAdmin()
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
			Bannerdata: []interface{}{},
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

func CreateBanner(c *fiber.Ctx) error {
	var title string
	isActive := true

	var body struct {
		Title    string `json:"title"`
		IsActive int    `json:"is_active"`
	}
	if err := c.BodyParser(&body); err == nil {
		title = body.Title
		if body.IsActive == 0 {
			isActive = false
		}
	}

	if c.FormValue("title") != "" {
		title = c.FormValue("title")
	}
	if c.FormValue("is_active") != "" {
		if c.FormValue("is_active") == "0" {
			isActive = false
		}
	}

	file, err := c.FormFile("image")
	var imageName string
	if err == nil {
		imageName = fmt.Sprintf("%d%s", time.Now().UnixNano(), filepath.Ext(file.Filename))
		if err := c.SaveFile(file, "./assets/img/banner/"+imageName); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(struct {
				Success bool   `json:"success"`
				Message string `json:"message"`
			}{
				Success: false,
				Message: "gagal menyimpan gambar",
			})
		}
	}

	banner, err := admin_service.CreateBanner(title, imageName, isActive)
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
		Success    bool        `json:"success"`
		Message    string      `json:"message"`
		Bannerdata interface{} `json:"Bannerdata"`
	}{
		Success:    true,
		Message:    "data banner berhasil ditambahkan",
		Bannerdata: []model.BannerAdmin{banner},
	})
}

func UpdateBanner(c *fiber.Ctx) error {
	id := c.Params("id")
	if id == "" {
		id = c.Query("id")
	}

	if id == "" {
		return c.Status(fiber.StatusBadRequest).JSON(struct {
			Success bool   `json:"success"`
			Message string `json:"message"`
		}{
			Success: false,
			Message: "id parameter is required",
		})
	}

	var title string
	var isActive *bool

	var body struct {
		Title    string `json:"title"`
		IsActive *int   `json:"is_active"`
	}
	if err := c.BodyParser(&body); err == nil {
		title = body.Title
		if body.IsActive != nil {
			val := *body.IsActive != 0
			isActive = &val
		}
	}

	if c.FormValue("title") != "" {
		title = c.FormValue("title")
	}
	if c.FormValue("is_active") != "" {
		val := c.FormValue("is_active") != "0"
		isActive = &val
	}

	file, err := c.FormFile("image")
	var imageName string
	if err == nil {
		imageName = fmt.Sprintf("%d%s", time.Now().UnixNano(), filepath.Ext(file.Filename))
		if err := c.SaveFile(file, "./assets/img/banner/"+imageName); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(struct {
				Success bool   `json:"success"`
				Message string `json:"message"`
			}{
				Success: false,
				Message: "gagal menyimpan gambar baru",
			})
		}
	}

	banner, err := admin_service.UpdateBanner(id, title, imageName, isActive)
	if err != nil {
		if err.Error() == "banner tidak ditemukan" {
			return c.Status(fiber.StatusNotFound).JSON(struct {
				Success    bool        `json:"success"`
				Message    string      `json:"message"`
				Bannerdata interface{} `json:"Bannerdata"`
			}{
				Success:    false,
				Message:    "data tidak ditemukan",
				Bannerdata: fiber.Map{},
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
		Success    bool        `json:"success"`
		Message    string      `json:"message"`
		Bannerdata interface{} `json:"Bannerdata"`
	}{
		Success:    true,
		Message:    "data banner berhasil di update",
		Bannerdata: []model.BannerAdmin{banner},
	})
}

func DeleteBanner(c *fiber.Ctx) error {
	id := c.Params("id")
	if id == "" {
		id = c.Query("id")
	}

	if id == "" {
		return c.Status(fiber.StatusBadRequest).JSON(struct {
			Success bool   `json:"success"`
			Message string `json:"message"`
		}{
			Success: false,
			Message: "id parameter is required",
		})
	}

	if err := admin_service.DeleteBanner(id); err != nil {
		if err.Error() == "banner tidak ditemukan" {
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
		Message: "data banner berhasil dihapus",
	})
}
