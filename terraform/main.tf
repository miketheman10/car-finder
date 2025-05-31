terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.0"
}

provider "aws" {
  region = "us-east-1"
}

data "aws_launch_template" "existing" {
  name = "Car-Finder" # Replace with your launch template name
}

resource "aws_instance" "from_template" {
  launch_template {
    id      = data.aws_launch_template.existing.id
    version = "$Latest"
  }
  tags = {
    Name = "CarFinder-Instance"
  }
}