import os
from PIL import Image
import argparse

def optimize_image(input_path, output_path, max_size=None, quality=85):
    """
    Optimize an image by resizing and compressing it.
    
    Args:
        input_path (str): Path to input image
        output_path (str): Path to save optimized image
        max_size (tuple): Maximum (width, height) for resizing
        quality (int): JPEG quality (1-100)
    """
    try:
        # Open the image
        with Image.open(input_path) as img:
            # Convert to RGB if necessary
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')
            
            # Resize if max_size is provided
            if max_size:
                img.thumbnail(max_size, Image.Resampling.LANCZOS)
            
            # Save the optimized image
            img.save(output_path, 'JPEG', quality=quality, optimize=True)
            
            print(f"Optimized: {output_path}")
            
    except Exception as e:
        print(f"Error processing {input_path}: {str(e)}")

def process_directory(input_dir, output_dir, max_size=None, quality=85):
    """
    Process all images in a directory.
    
    Args:
        input_dir (str): Input directory path
        output_dir (str): Output directory path
        max_size (tuple): Maximum (width, height) for resizing
        quality (int): JPEG quality (1-100)
    """
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Process all images in the input directory
    for filename in os.listdir(input_dir):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            input_path = os.path.join(input_dir, filename)
            output_path = os.path.join(output_dir, filename)
            
            # Convert PNG to JPG for output
            if filename.lower().endswith('.png'):
                output_path = os.path.splitext(output_path)[0] + '.jpg'
            
            optimize_image(input_path, output_path, max_size, quality)

def main():
    parser = argparse.ArgumentParser(description='Optimize images for web use')
    parser.add_argument('--input', required=True, help='Input directory containing original images')
    parser.add_argument('--full', default='images/full', help='Output directory for full-size images')
    parser.add_argument('--thumb', default='images/thumbnails', help='Output directory for thumbnails')
    parser.add_argument('--full-quality', type=int, default=85, help='Quality for full-size images (1-100)')
    parser.add_argument('--thumb-quality', type=int, default=80, help='Quality for thumbnails (1-100)')
    parser.add_argument('--thumb-size', type=int, default=500, help='Maximum size for thumbnails')
    
    args = parser.parse_args()
    
    # Process full-size images
    print("\nProcessing full-size images...")
    process_directory(args.input, args.full, quality=args.full_quality)
    
    # Process thumbnails
    print("\nProcessing thumbnails...")
    process_directory(args.input, args.thumb, max_size=(args.thumb_size, args.thumb_size), quality=args.thumb_quality)
    
    print("\nImage optimization complete!")

if __name__ == '__main__':
    main() 