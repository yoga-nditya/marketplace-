package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func GetDSN() string {
	dsn := os.Getenv("DB_URL")
	if dsn == "" {
		log.Println("DB_URL not found, using default URL for testing...")
		dsn = "root:@tcp(127.0.0.1:3306)/giftmoment?charset=utf8mb4&parseTime=True&loc=Local"
	}
	return dsn
}

func ConnectDB() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found or failed to load. Using system environment variables.")
	}

	dsn := GetDSN()

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Printf("Failed to connect to database: %v\n", err)
	} else {
		log.Println("Successfully connected to the database")
	}

	DB = db
}
