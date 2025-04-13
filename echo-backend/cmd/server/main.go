package main

import (
  "log"
  "github.com/labstack/echo/v4"
)

func main() {
  e := echo.New()
  // Just a test route:
  e.GET("/", func(c echo.Context) error {
    return c.String(200, "Hello from Echo!")
  })

  log.Println("Starting server on :8080")
  e.Logger.Fatal(e.Start(":8080"))
}
