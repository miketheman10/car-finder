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

# Reference existing subnet
data "aws_subnet" "existing" {
  id = "subnet-0df45aecbb6abff96" # Replace with your subnet ID
}

# Reference existing security group
data "aws_security_group" "existing" {
  id = "sg-0efdf9ee373a5b6cc" # Replace with your security group ID
}

# Reference existing launch template
data "aws_launch_template" "existing" {
  name = "Car-Finder" # Replace with your launch template name
}

resource "aws_instance" "from_template" {
  ami           = data.aws_launch_template.existing.image_id
  instance_type = data.aws_launch_template.existing.instance_type
  subnet_id     = data.aws_subnet.existing.id
  vpc_security_group_ids = [data.aws_security_group.existing.id]

  # Optionally, you can override launch template settings here

  tags = {
    Name = "CarFinder-Instance"
  }
}