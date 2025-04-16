import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { fabric } from 'fabric';

interface WireframeCanvasProps {
  onReady?: () => void;
  templateType?: string;
}

// Predefined UI component templates
const templates = {
  ecommerce: {
    header: (canvas: fabric.Canvas) => {
      const group = new fabric.Group([], { 
        left: 50, 
        top: 20, 
        width: canvas.width! - 100, 
        height: 60 
      });

      // Header background
      const headerBg = new fabric.Rect({
        left: 0,
        top: 0,
        width: canvas.width! - 100,
        height: 60,
        fill: '#ffffff',
        stroke: '#f0f0f0',
        strokeWidth: 1
      });

      // Logo
      const logo = new fabric.Text('Logo', { 
        left: 20, 
        top: 20, 
        fontSize: 18,
        fontFamily: 'Arial',
        fontWeight: 'bold'
      });

      // Navigation
      const navItems = ['Shop', 'Subscribe', 'About'];
      const navGroup = new fabric.Group([], { left: 120, top: 20 });
      
      navItems.forEach((item, index) => {
        const navItem = new fabric.Text(item, {
          left: index * 100,
          top: 0,
          fontSize: 16,
          fontFamily: 'Arial'
        });
        navGroup.addWithUpdate(navItem);
      });

      // Search
      const searchRect = new fabric.Rect({
        left: canvas.width! - 280,
        top: 15,
        width: 180,
        height: 30,
        fill: '#f9f9f9',
        stroke: '#e5e5e5',
        strokeWidth: 1,
        rx: 4,
        ry: 4
      });
      
      const searchText = new fabric.Text('Search product', {
        left: canvas.width! - 270,
        top: 22,
        fontSize: 14,
        fontFamily: 'Arial',
        fill: '#999'
      });

      group.addWithUpdate(headerBg);
      group.addWithUpdate(logo);
      group.addWithUpdate(navGroup);
      group.addWithUpdate(searchRect);
      group.addWithUpdate(searchText);

      canvas.add(group);
      return group;
    },
    
    heroSection: (canvas: fabric.Canvas) => {
      const group = new fabric.Group([], { 
        left: 50, 
        top: 100, 
        width: canvas.width! - 100, 
        height: 300 
      });

      // Banner rectangle
      const banner = new fabric.Rect({
        left: 0,
        top: 0,
        width: canvas.width! - 100,
        height: 300,
        fill: '#f6f6f6',
        stroke: '#e0e0e0',
        strokeWidth: 1
      });

      // Left-side placeholder image
      const imagePlaceholder = new fabric.Rect({
        left: 30,
        top: 30,
        width: (canvas.width! - 100) / 2 - 60,
        height: 240,
        fill: '#e0e0e0',
        stroke: '#d0d0d0',
        strokeWidth: 1
      });

      const contentLeft = (canvas.width! - 100) / 2 + 30;

      // Heading
      const heading = new fabric.Text('Welcome to our\nHerbal Tea Shop!', {
        left: contentLeft,
        top: 50,
        fontSize: 24,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        textAlign: 'left'
      });

      // Description
      const description = new fabric.Text('At our shop, we believe in the power of herbs to heal and\nnourish the body. That\'s why we\'ve carefully curated a\ncollection of the finest organic herbs and blends.', {
        left: contentLeft,
        top: 120,
        fontSize: 14,
        fontFamily: 'Arial',
        textAlign: 'left',
        lineHeight: 1.4
      });

      // CTA Button
      const ctaButton = new fabric.Rect({
        left: contentLeft,
        top: 210,
        width: 120,
        height: 40,
        fill: '#333',
        rx: 4,
        ry: 4
      });

      const ctaText = new fabric.Text('Shop now', {
        left: contentLeft + 25,
        top: 222,
        fontSize: 14,
        fontFamily: 'Arial',
        fill: 'white'
      });

      group.addWithUpdate(banner);
      group.addWithUpdate(imagePlaceholder);
      group.addWithUpdate(heading);
      group.addWithUpdate(description);
      group.addWithUpdate(ctaButton);
      group.addWithUpdate(ctaText);

      canvas.add(group);
      return group;
    },
    
    productGrid: (canvas: fabric.Canvas) => {
      const group = new fabric.Group([], { 
        left: 50, 
        top: 420, 
        width: canvas.width! - 100, 
        height: 400
      });

      // Background
      const background = new fabric.Rect({
        left: 0,
        top: 0,
        width: canvas.width! - 100,
        height: 400,
        fill: '#ffffff',
        stroke: '#f0f0f0',
        strokeWidth: 1
      });

      // Section title
      const sectionTitle = new fabric.Text('Green Tea Selection', {
        left: 20,
        top: 20,
        fontSize: 22,
        fontFamily: 'Arial',
        fontWeight: 'bold'
      });

      // Filter section
      const filterText = new fabric.Text('Filter', {
        left: 20,
        top: 70,
        fontSize: 16,
        fontFamily: 'Arial',
        fontWeight: 'bold'
      });

      // Filter buttons
      const filterTypes = ['Black Tea', 'Green tea', 'Rooibos tea', 'White tea'];
      const filterGroup = new fabric.Group([], { left: 20, top: 100 });
      
      filterTypes.forEach((type, index) => {
        const filterRect = new fabric.Rect({
          left: index * 110,
          top: 0,
          width: 100,
          height: 30,
          fill: index === 1 ? '#f0f0f0' : 'transparent',
          stroke: '#d0d0d0',
          strokeWidth: 1,
          rx: 15,
          ry: 15
        });
        
        const filterName = new fabric.Text(type, {
          left: index * 110 + 15,
          top: 8,
          fontSize: 12,
          fontFamily: 'Arial'
        });
        
        filterGroup.addWithUpdate(filterRect);
        filterGroup.addWithUpdate(filterName);
      });

      // Calculate card dimensions based on canvas width
      const containerWidth = canvas.width! - 100 - 40; // Minus padding
      const cardWidth = Math.min(250, containerWidth / 3 - 20); // Max width 250px or fit 3 columns
      const cardSpacing = 20;
      const cardHeight = 120;

      // Product cards - create a 3x2 grid
      const productGroup = new fabric.Group([], { left: 20, top: 150 });
      
      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 3; col++) {
          const cardLeft = col * (cardWidth + cardSpacing);
          const cardTop = row * (cardHeight + cardSpacing);
          
          // Product card with border
          const card = new fabric.Rect({
            left: cardLeft,
            top: cardTop,
            width: cardWidth,
            height: cardHeight,
            fill: '#ffffff',
            stroke: '#e0e0e0',
            strokeWidth: 1,
            rx: 4,
            ry: 4
          });
          
          // Product image placeholder with consistent size
          const imageSize = cardHeight - 40;
          const imagePlaceholder = new fabric.Rect({
            left: cardLeft + 10,
            top: cardTop + 10,
            width: imageSize,
            height: imageSize,
            fill: '#f0f0f0'
          });
          
          // Text column starting position
          const textLeft = cardLeft + imageSize + 20;
          
          // Product name
          const productName = new fabric.Text('Green Tea', {
            left: textLeft,
            top: cardTop + 20,
            fontSize: 14,
            fontFamily: 'Arial',
            fontWeight: 'bold'
          });
          
          // Product price
          const price = new fabric.Text('$20', {
            left: textLeft,
            top: cardTop + 45,
            fontSize: 14,
            fontFamily: 'Arial',
            fontWeight: 'bold'
          });
          
          productGroup.addWithUpdate(card);
          productGroup.addWithUpdate(imagePlaceholder);
          productGroup.addWithUpdate(productName);
          productGroup.addWithUpdate(price);
        }
      }

      group.addWithUpdate(background);
      group.addWithUpdate(sectionTitle);
      group.addWithUpdate(filterText);
      group.addWithUpdate(filterGroup);
      group.addWithUpdate(productGroup);

      canvas.add(group);
      return group;
    },
    
    footer: (canvas: fabric.Canvas) => {
      const group = new fabric.Group([], { 
        left: 50, 
        top: 840, 
        width: canvas.width! - 100, 
        height: 200 
      });

      // Footer container
      const footerRect = new fabric.Rect({
        left: 0,
        top: 0,
        width: canvas.width! - 100,
        height: 200,
        fill: '#333333',
        opacity: 0.9
      });

      // Column layout width calculation
      const columnWidth = (canvas.width! - 100) / 4;

      // Footer columns
      const columns = ['Help', 'About', 'Legal', 'Contact'];
      const columnsGroup = new fabric.Group([], { left: 0, top: 0 });
      
      columns.forEach((column, index) => {
        const columnLeft = 30 + (index * columnWidth);
        
        const columnTitle = new fabric.Text(column, {
          left: columnLeft,
          top: 30,
          fontSize: 16,
          fontFamily: 'Arial',
          fill: 'white',
          fontWeight: 'bold'
        });
        
        // Column items
        const items = ['Item 1', 'Item 2', 'Item 3'];
        items.forEach((item, itemIndex) => {
          const columnItem = new fabric.Text(item, {
            left: columnLeft,
            top: 60 + itemIndex * 25,
            fontSize: 14,
            fontFamily: 'Arial',
            fill: 'white',
            opacity: 0.8
          });
          
          columnsGroup.addWithUpdate(columnItem);
        });
        
        columnsGroup.addWithUpdate(columnTitle);
      });

      // Newsletter signup - positioned in the rightmost area with improved styling
      const newsletterLeft = (canvas.width! - 100) - 240;
      
      // Semi-transparent background for newsletter
      const newsletterBg = new fabric.Rect({
        left: newsletterLeft - 10,
        top: 20,
        width: 230,
        height: 160,
        fill: '#444444',
        opacity: 0.7,
        rx: 8,
        ry: 8,
        stroke: '#555555',
        strokeWidth: 1,
      });
      
      const newsletterTitle = new fabric.Text('Join our newsletter', {
        left: newsletterLeft,
        top: 30,
        fontSize: 16,
        fontFamily: 'Arial',
        fill: 'white',
        fontWeight: 'bold'
      });
      
      const emailInput = new fabric.Rect({
        left: newsletterLeft,
        top: 60,
        width: 200,
        height: 40,
        fill: 'white',
        rx: 4,
        ry: 4,
        shadow: new fabric.Shadow({
          color: 'rgba(0,0,0,0.2)',
          blur: 4,
          offsetX: 0,
          offsetY: 2
        })
      });
      
      const emailPlaceholder = new fabric.Text('Enter your email address', {
        left: newsletterLeft + 10,
        top: 72,
        fontSize: 14,
        fontFamily: 'Arial',
        fill: '#999'
      });
      
      const subscribeButton = new fabric.Rect({
        left: newsletterLeft,
        top: 110,
        width: 120,
        height: 40,
        fill: '#555555',
        rx: 4,
        ry: 4,
        shadow: new fabric.Shadow({
          color: 'rgba(0,0,0,0.2)',
          blur: 4,
          offsetX: 0,
          offsetY: 2
        })
      });
      
      const subscribeText = new fabric.Text('Subscribe now', {
        left: newsletterLeft + 12,
        top: 122,
        fontSize: 14,
        fontFamily: 'Arial',
        fill: 'white'
      });

      group.addWithUpdate(footerRect);
      group.addWithUpdate(columnsGroup);
      group.addWithUpdate(newsletterBg);
      group.addWithUpdate(newsletterTitle);
      group.addWithUpdate(emailInput);
      group.addWithUpdate(emailPlaceholder);
      group.addWithUpdate(subscribeButton);
      group.addWithUpdate(subscribeText);

      canvas.add(group);
      return group;
    },
    
    // New component - Search Bar
    searchBar: (canvas: fabric.Canvas) => {
      const group = new fabric.Group([], { 
        left: 100, 
        top: 100, 
        width: 300, 
        height: 40 
      });
      
      const searchBg = new fabric.Rect({
        left: 0,
        top: 0,
        width: 300,
        height: 40,
        fill: '#f9f9f9',
        stroke: '#e5e5e5',
        strokeWidth: 1,
        rx: 4,
        ry: 4
      });
      
      const searchText = new fabric.Text('Search...', {
        left: 15,
        top: 12,
        fontSize: 14,
        fontFamily: 'Arial',
        fill: '#999'
      });
      
      const searchIcon = new fabric.Text('🔍', {
        left: 270,
        top: 10,
        fontSize: 16
      });
      
      group.addWithUpdate(searchBg);
      group.addWithUpdate(searchText);
      group.addWithUpdate(searchIcon);
      
      canvas.add(group);
      return group;
    },
    
    // New component - Card
    card: (canvas: fabric.Canvas) => {
      const group = new fabric.Group([], { 
        left: 100, 
        top: 100, 
        width: 250, 
        height: 300 
      });
      
      const cardBg = new fabric.Rect({
        left: 0,
        top: 0,
        width: 250,
        height: 300,
        fill: '#ffffff',
        stroke: '#e0e0e0',
        strokeWidth: 1,
        rx: 8,
        ry: 8
      });
      
      const cardHeader = new fabric.Rect({
        left: 0,
        top: 0,
        width: 250,
        height: 150,
        fill: '#f0f0f0',
        rx: 8,
        ry: 8
      });
      
      const cardTitle = new fabric.Text('Card Title', {
        left: 20,
        top: 165,
        fontSize: 18,
        fontFamily: 'Arial',
        fontWeight: 'bold'
      });
      
      const cardText = new fabric.Text('This is a card component with sample text content that can be used in wireframes.', {
        left: 20,
        top: 195,
        fontSize: 14,
        fontFamily: 'Arial',
        width: 210,
        lineHeight: 1.3
      });
      
      const cardButton = new fabric.Rect({
        left: 20,
        top: 250,
        width: 100,
        height: 30,
        fill: '#4a85f0',
        rx: 4,
        ry: 4
      });
      
      const buttonText = new fabric.Text('Read More', {
        left: 33,
        top: 257,
        fontSize: 14,
        fontFamily: 'Arial',
        fill: 'white'
      });
      
      group.addWithUpdate(cardBg);
      group.addWithUpdate(cardHeader);
      group.addWithUpdate(cardTitle);
      group.addWithUpdate(cardText);
      group.addWithUpdate(cardButton);
      group.addWithUpdate(buttonText);
      
      canvas.add(group);
      return group;
    },
    
    // New component - Form
    form: (canvas: fabric.Canvas) => {
      const group = new fabric.Group([], { 
        left: 100, 
        top: 100, 
        width: 400, 
        height: 350 
      });
      
      const formBg = new fabric.Rect({
        left: 0,
        top: 0,
        width: 400,
        height: 350,
        fill: '#ffffff',
        stroke: '#e0e0e0',
        strokeWidth: 1,
        rx: 8,
        ry: 8
      });
      
      const formTitle = new fabric.Text('Contact Form', {
        left: 20,
        top: 20,
        fontSize: 20,
        fontFamily: 'Arial',
        fontWeight: 'bold'
      });
      
      // Name field
      const nameLabel = new fabric.Text('Name', {
        left: 20,
        top: 60,
        fontSize: 14,
        fontFamily: 'Arial'
      });
      
      const nameField = new fabric.Rect({
        left: 20,
        top: 85,
        width: 360,
        height: 40,
        fill: '#f9f9f9',
        stroke: '#e0e0e0',
        strokeWidth: 1,
        rx: 4,
        ry: 4
      });
      
      // Email field
      const emailLabel = new fabric.Text('Email', {
        left: 20,
        top: 140,
        fontSize: 14,
        fontFamily: 'Arial'
      });
      
      const emailField = new fabric.Rect({
        left: 20,
        top: 165,
        width: 360,
        height: 40,
        fill: '#f9f9f9',
        stroke: '#e0e0e0',
        strokeWidth: 1,
        rx: 4,
        ry: 4
      });
      
      // Message field
      const messageLabel = new fabric.Text('Message', {
        left: 20,
        top: 220,
        fontSize: 14,
        fontFamily: 'Arial'
      });
      
      const messageField = new fabric.Rect({
        left: 20,
        top: 245,
        width: 360,
        height: 60,
        fill: '#f9f9f9',
        stroke: '#e0e0e0',
        strokeWidth: 1,
        rx: 4,
        ry: 4
      });
      
      // Submit button
      const submitButton = new fabric.Rect({
        left: 20,
        top: 320,
        width: 120,
        height: 40,
        fill: '#4a85f0',
        rx: 4,
        ry: 4
      });
      
      const submitText = new fabric.Text('Submit', {
        left: 55,
        top: 330,
        fontSize: 16,
        fontFamily: 'Arial',
        fill: 'white'
      });
      
      group.addWithUpdate(formBg);
      group.addWithUpdate(formTitle);
      group.addWithUpdate(nameLabel);
      group.addWithUpdate(nameField);
      group.addWithUpdate(emailLabel);
      group.addWithUpdate(emailField);
      group.addWithUpdate(messageLabel);
      group.addWithUpdate(messageField);
      group.addWithUpdate(submitButton);
      group.addWithUpdate(submitText);
      
      canvas.add(group);
      return group;
    },
    
    // New component - Navigation Bar
    navBar: (canvas: fabric.Canvas) => {
      const group = new fabric.Group([], { 
        left: 50, 
        top: 20, 
        width: canvas.width! - 100, 
        height: 60 
      });

      // Nav background
      const navBg = new fabric.Rect({
        left: 0,
        top: 0,
        width: canvas.width! - 100,
        height: 60,
        fill: '#333333',
      });

      // Logo
      const logo = new fabric.Text('LOGO', { 
        left: 30, 
        top: 20, 
        fontSize: 20,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fill: 'white'
      });

      // Navigation items
      const navItems = ['Home', 'About', 'Products', 'Blog', 'Contact'];
      const navItemGroup = new fabric.Group([], { left: 300, top: 0 });
      
      navItems.forEach((item, index) => {
        const navItem = new fabric.Text(item, {
          left: index * 100,
          top: 20,
          fontSize: 16,
          fontFamily: 'Arial',
          fill: 'white'
        });
        navItemGroup.addWithUpdate(navItem);
      });

      // Button
      const button = new fabric.Rect({
        left: canvas.width! - 180,
        top: 15,
        width: 100,
        height: 30,
        fill: '#4a85f0',
        rx: 4,
        ry: 4
      });
      
      const buttonText = new fabric.Text('Sign Up', {
        left: canvas.width! - 155,
        top: 20,
        fontSize: 14,
        fontFamily: 'Arial',
        fill: 'white'
      });

      group.addWithUpdate(navBg);
      group.addWithUpdate(logo);
      group.addWithUpdate(navItemGroup);
      group.addWithUpdate(button);
      group.addWithUpdate(buttonText);

      canvas.add(group);
      return group;
    },
    
    // New component - Call to Action
    callToAction: (canvas: fabric.Canvas) => {
      const group = new fabric.Group([], { 
        left: 100, 
        top: 100, 
        width: 500, 
        height: 200 
      });
      
      const ctaBg = new fabric.Rect({
        left: 0,
        top: 0,
        width: 500,
        height: 200,
        fill: '#4a85f0',
        opacity: 0.1,
        rx: 8,
        ry: 8
      });
      
      const ctaTitle = new fabric.Text('Ready to Get Started?', {
        left: 100,
        top: 50,
        fontSize: 24,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fill: '#333333'
      });
      
      const ctaText = new fabric.Text('Join thousands of satisfied customers using our product', {
        left: 80,
        top: 90,
        fontSize: 16,
        fontFamily: 'Arial',
        fill: '#666666'
      });
      
      const ctaButton = new fabric.Rect({
        left: 170,
        top: 130,
        width: 160,
        height: 50,
        fill: '#4a85f0',
        rx: 4,
        ry: 4
      });
      
      const buttonText = new fabric.Text('Sign Up for Free', {
        left: 185,
        top: 145,
        fontSize: 16,
        fontFamily: 'Arial',
        fill: 'white'
      });
      
      group.addWithUpdate(ctaBg);
      group.addWithUpdate(ctaTitle);
      group.addWithUpdate(ctaText);
      group.addWithUpdate(ctaButton);
      group.addWithUpdate(buttonText);
      
      canvas.add(group);
      return group;
    },
    
    // New component - Testimonial
    testimonial: (canvas: fabric.Canvas) => {
      const group = new fabric.Group([], { 
        left: 100, 
        top: 100, 
        width: 300, 
        height: 200 
      });
      
      const testimonialBg = new fabric.Rect({
        left: 0,
        top: 0,
        width: 300,
        height: 200,
        fill: '#ffffff',
        stroke: '#e0e0e0',
        strokeWidth: 1,
        rx: 8,
        ry: 8
      });
      
      // Avatar circle
      const avatarCircle = new fabric.Circle({
        left: 40,
        top: 30,
        radius: 30,
        fill: '#f0f0f0'
      });
      
      const quoteText = new fabric.Text('"This product has completely transformed how we work. The features are intuitive and the support team is outstanding!"', {
        left: 30,
        top: 80,
        width: 240,
        fontSize: 14,
        fontFamily: 'Arial',
        lineHeight: 1.3,
        textAlign: 'center'
      });
      
      const authorName = new fabric.Text('Jane Smith', {
        left: 105,
        top: 150,
        fontSize: 16,
        fontFamily: 'Arial',
        fontWeight: 'bold'
      });
      
      const authorTitle = new fabric.Text('CEO, Company Inc.', {
        left: 90,
        top: 170,
        fontSize: 12,
        fontFamily: 'Arial',
        fill: '#666666'
      });
      
      group.addWithUpdate(testimonialBg);
      group.addWithUpdate(avatarCircle);
      group.addWithUpdate(quoteText);
      group.addWithUpdate(authorName);
      group.addWithUpdate(authorTitle);
      
      canvas.add(group);
      return group;
    },
    
    // New component - Generic Section
    section: (canvas: fabric.Canvas, title: string, description: string) => {
      const group = new fabric.Group([], { 
        left: 50, 
        top: 100, 
        width: canvas.width! - 100, 
        height: 300 
      });

      // Background rectangle
      const sectionBg = new fabric.Rect({
        left: 0,
        top: 0,
        width: canvas.width! - 100,
        height: 300,
        fill: '#ffffff',
        stroke: '#e0e0e0',
        strokeWidth: 1
      });

      // Heading
      const heading = new fabric.Text(title, {
        left: (canvas.width! - 100) / 2 - 100,
        top: 30,
        fontSize: 24,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        textAlign: 'center'
      });

      // Description
      const desc = new fabric.Text(description, {
        left: (canvas.width! - 100) / 2 - 200,
        top: 70,
        width: 400,
        fontSize: 16,
        fontFamily: 'Arial',
        textAlign: 'center',
        lineHeight: 1.3
      });

      group.addWithUpdate(sectionBg);
      group.addWithUpdate(heading);
      group.addWithUpdate(desc);

      canvas.add(group);
      return group;
    },
    
    // New component - Pricing Table
    pricingTable: (canvas: fabric.Canvas) => {
      const group = new fabric.Group([], { 
        left: 50, 
        top: 100, 
        width: canvas.width! - 100, 
        height: 400 
      });
      
      // Background
      const background = new fabric.Rect({
        left: 0,
        top: 0,
        width: canvas.width! - 100,
        height: 400,
        fill: '#ffffff',
        stroke: '#f0f0f0',
        strokeWidth: 1
      });
      
      // Section title
      const sectionTitle = new fabric.Text('Pricing Plans', {
        left: (canvas.width! - 100) / 2 - 70,
        top: 20,
        fontSize: 24,
        fontFamily: 'Arial',
        fontWeight: 'bold'
      });
      
      // Pricing cards - create a row of 3 cards
      const cardWidth = (canvas.width! - 100 - 80) / 3; // Minus padding
      const cardSpacing = 20;
      const cardHeight = 300;
      
      const priceOptions = ['Basic', 'Pro', 'Enterprise'];
      const prices = ['$19', '$49', '$99'];
      
      for (let i = 0; i < 3; i++) {
        const cardLeft = 20 + i * (cardWidth + cardSpacing);
        
        // Price card
        const card = new fabric.Rect({
          left: cardLeft,
          top: 80,
          width: cardWidth,
          height: cardHeight,
          fill: i === 1 ? '#f9f9ff' : '#ffffff',
          stroke: i === 1 ? '#4a85f0' : '#e0e0e0',
          strokeWidth: i === 1 ? 2 : 1,
          rx: 8,
          ry: 8
        });
        
        // Price tier
        const tier = new fabric.Text(priceOptions[i], {
          left: cardLeft + cardWidth/2 - 20,
          top: 100,
          fontSize: 18,
          fontFamily: 'Arial',
          fontWeight: 'bold'
        });
        
        // Price
        const price = new fabric.Text(prices[i], {
          left: cardLeft + cardWidth/2 - 20,
          top: 130,
          fontSize: 24,
          fontFamily: 'Arial',
          fontWeight: 'bold'
        });
        
        // Period
        const period = new fabric.Text('/month', {
          left: cardLeft + cardWidth/2 + 20,
          top: 138,
          fontSize: 14,
          fontFamily: 'Arial',
          fill: '#666666'
        });
        
        // Features text
        const features = new fabric.Text('• Feature 1\n• Feature 2\n• Feature 3', {
          left: cardLeft + 20,
          top: 170,
          fontSize: 14,
          fontFamily: 'Arial',
          lineHeight: 1.5
        });
        
        // Button
        const button = new fabric.Rect({
          left: cardLeft + 20,
          top: 250,
          width: cardWidth - 40,
          height: 40,
          fill: i === 1 ? '#4a85f0' : '#f0f0f0',
          rx: 4,
          ry: 4
        });
        
        const buttonText = new fabric.Text('Choose Plan', {
          left: cardLeft + cardWidth/2 - 45,
          top: 262,
          fontSize: 16,
          fontFamily: 'Arial',
          fill: i === 1 ? 'white' : '#333333'
        });
        
        group.addWithUpdate(card);
        group.addWithUpdate(tier);
        group.addWithUpdate(price);
        group.addWithUpdate(period);
        group.addWithUpdate(features);
        group.addWithUpdate(button);
        group.addWithUpdate(buttonText);
      }
      
      group.addWithUpdate(background);
      group.addWithUpdate(sectionTitle);
      
      canvas.add(group);
      return group;
    }
  },
  
  dashboard: {
    header: (canvas: fabric.Canvas) => {
      const group = new fabric.Group([], { 
        left: 0, 
        top: 0, 
        width: canvas.width!, 
        height: 60 
      });

      // Header background
      const headerBg = new fabric.Rect({
        left: 0,
        top: 0,
        width: canvas.width!,
        height: 60,
        fill: '#2c3e50'
      });

      // Logo
      const logo = new fabric.Text('DashApp', { 
        left: 20, 
        top: 18, 
        fontSize: 20,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fill: 'white'
      });

      // Search
      const searchRect = new fabric.Rect({
        left: 220,
        top: 15,
        width: 200,
        height: 30,
        fill: '#34495e',
        rx: 4,
        ry: 4
      });
      
      const searchText = new fabric.Text('Search...', {
        left: 235,
        top: 20,
        fontSize: 14,
        fontFamily: 'Arial',
        fill: '#95a5a6'
      });

      // User info
      const userCircle = new fabric.Circle({
        left: canvas.width! - 40,
        top: 15,
        radius: 15,
        fill: '#95a5a6'
      });
      
      const userName = new fabric.Text('User', {
        left: canvas.width! - 80,
        top: 20,
        fontSize: 14,
        fontFamily: 'Arial',
        fill: 'white'
      });

      group.addWithUpdate(headerBg);
      group.addWithUpdate(logo);
      group.addWithUpdate(searchRect);
      group.addWithUpdate(searchText);
      group.addWithUpdate(userCircle);
      group.addWithUpdate(userName);

      canvas.add(group);
      return group;
    },
    
    content: (canvas: fabric.Canvas) => {
      const group = new fabric.Group([], { 
        left: 0, 
        top: 60, 
        width: canvas.width!, 
        height: canvas.height! - 60
      });

      // Sidebar
      const sidebarBg = new fabric.Rect({
        left: 0,
        top: 0,
        width: 200,
        height: canvas.height! - 60,
        fill: '#2c3e50'
      });
      
      // Sidebar menu items
      const menuItems = ['Dashboard', 'Analytics', 'Users', 'Reports', 'Settings'];
      const menuGroup = new fabric.Group([], { left: 0, top: 20 });
      
      menuItems.forEach((item, index) => {
        const menuItem = new fabric.Text(item, {
          left: 20,
          top: index * 40,
          fontSize: 16,
          fontFamily: 'Arial',
          fill: 'white'
        });
        menuGroup.addWithUpdate(menuItem);
      });
      
      // Main content area
      const contentBg = new fabric.Rect({
        left: 200,
        top: 0,
        width: canvas.width! - 200,
        height: canvas.height! - 60,
        fill: '#ecf0f1'
      });
      
      // Dashboard cards - create a 2x2 grid
      const cardWidth = (canvas.width! - 200 - 80) / 2;
      const cardHeight = 150;
      
      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 2; col++) {
          const cardLeft = 220 + col * (cardWidth + 20);
          const cardTop = 20 + row * (cardHeight + 20);
          
          // Card
          const card = new fabric.Rect({
            left: cardLeft,
            top: cardTop,
            width: cardWidth,
            height: cardHeight,
            fill: '#ffffff',
            rx: 4,
            ry: 4,
            shadow: new fabric.Shadow({
              color: 'rgba(0,0,0,0.1)',
              offsetX: 0,
              offsetY: 2,
              blur: 5
            })
          });
          
          // Card title
          const titles = ['Total Users', 'Revenue', 'Engagement', 'Conversion'];
          const title = new fabric.Text(titles[row * 2 + col], {
            left: cardLeft + 20,
            top: cardTop + 20,
            fontSize: 16,
            fontFamily: 'Arial',
            fontWeight: 'bold'
          });
          
          // Card value
          const values = ['12,345', '$45,678', '78.9%', '23.4%'];
          const value = new fabric.Text(values[row * 2 + col], {
            left: cardLeft + 20,
            top: cardTop + 60,
            fontSize: 28,
            fontFamily: 'Arial',
            fontWeight: 'bold'
          });
          
          group.addWithUpdate(card);
          group.addWithUpdate(title);
          group.addWithUpdate(value);
        }
      }
      
      // Add a chart
      const chartRect = new fabric.Rect({
        left: 220,
        top: 360,
        width: canvas.width! - 240,
        height: 300,
        fill: '#ffffff',
        rx: 4,
        ry: 4,
        shadow: new fabric.Shadow({
          color: 'rgba(0,0,0,0.1)',
          offsetX: 0,
          offsetY: 2,
          blur: 5
        })
      });
      
      const chartTitle = new fabric.Text('Monthly Performance', {
        left: 240,
        top: 380,
        fontSize: 18,
        fontFamily: 'Arial',
        fontWeight: 'bold'
      });
      
      // Simplified chart visualization
      const chartBg = new fabric.Rect({
        left: 240,
        top: 420,
        width: canvas.width! - 280,
        height: 220,
        fill: '#f9f9f9',
        rx: 4,
        ry: 4
      });
      
      // Chart bars (simplified)
      const barWidth = (canvas.width! - 320) / 12;
      const barGroup = new fabric.Group([], { left: 260, top: 440 });
      
      for (let i = 0; i < 12; i++) {
        const barLeft = i * (barWidth + 5);
        const barHeight = 80 + Math.random() * 120;
        
        const bar = new fabric.Rect({
          left: barLeft,
          top: 200 - barHeight,
          width: barWidth,
          height: barHeight,
          fill: '#3498db',
          rx: 2,
          ry: 2
        });
        
        barGroup.addWithUpdate(bar);
      }

      group.addWithUpdate(sidebarBg);
      group.addWithUpdate(menuGroup);
      group.addWithUpdate(contentBg);
      group.addWithUpdate(chartRect);
      group.addWithUpdate(chartTitle);
      group.addWithUpdate(chartBg);
      group.addWithUpdate(barGroup);

      canvas.add(group);
      return group;
    }
  }
};

// Create a forwardRef component to expose imperative methods
const WireframeCanvas = forwardRef<any, WireframeCanvasProps>(({ onReady, templateType = 'ecommerce' }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [selectedElement, setSelectedElement] = useState<fabric.Object | null>(null);
  const [gridVisible, setGridVisible] = useState(true);

  // Apply e-commerce template
  const applyEcommerceTemplate = (canvas: fabric.Canvas) => {
    // Clear canvas first
    canvas.clear();
    
    // Apply all e-commerce template sections
    templates.ecommerce.header(canvas);
    templates.ecommerce.heroSection(canvas);
    templates.ecommerce.productGrid(canvas);
    templates.ecommerce.footer(canvas);
    
    canvas.renderAll();
  };

  // Add this function to make objects selectable but not modifiable
  const makeObjectsSelectable = (canvas: fabric.Canvas) => {
    canvas.forEachObject(obj => {
      // Make objects selectable but not modifiable
      obj.selectable = true;
      obj.lockMovementX = true;
      obj.lockMovementY = true;
      obj.lockRotation = true;
      obj.lockScalingX = true;
      obj.lockScalingY = true;
      obj.hasControls = false;
      obj.hasBorders = true;
      obj.borderColor = 'rgba(99, 102, 241, 0.8)';
      obj.borderScaleFactor = 2;
      
      // Add custom properties to help with identification in the new tab view
      obj.set('elementType', obj.type);
      if (obj.type === 'text' || obj.type === 'i-text') {
        obj.set('elementLabel', (obj as fabric.Text).text);
      } else {
        obj.set('elementLabel', `${obj.type} element`);
      }
    });
    
    canvas.renderAll();
  };

  // Initialize canvas on mount
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Create fabric canvas instance
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: canvasRef.current.width,
      height: canvasRef.current.height,
      preserveObjectStacking: true,
      backgroundColor: '#ffffff'
    });
    
    // Set canvas instance to reference
    fabricCanvasRef.current = fabricCanvas;
    
    // Apply template if specified
    if (templateType) {
      if (templateType === 'ecommerce') {
        applyEcommerceTemplate(fabricCanvas);
      } else if (templateType === 'dashboard') {
        templates.dashboard.header(fabricCanvas);
        templates.dashboard.content(fabricCanvas);
      }
    }
    
    // Add event listeners for selection changes
    fabricCanvas.on('selection:created', (e) => {
      setSelectedElement(e.selected ? e.selected[0] : null);
    });
    
    fabricCanvas.on('selection:updated', (e) => {
      setSelectedElement(e.selected ? e.selected[0] : null);
    });
    
    fabricCanvas.on('selection:cleared', () => {
      setSelectedElement(null);
    });
    
    // After initialization, make all objects selectable but not modifiable
    makeObjectsSelectable(fabricCanvas);
    
    // Notify parent component that canvas is ready
    if (onReady) {
      onReady();
    }
    
    // Clean up on unmount
    return () => {
      fabricCanvas.dispose();
    };
  }, [templateType, onReady]);

  // Toggle grid visibility
  const toggleGrid = (show: boolean) => {
    setGridVisible(show);
    
    if (!fabricCanvasRef.current) return;
    
    if (show) {
      // Add grid pattern
      const gridSize = 20;
      const gridColor = 'rgba(0, 0, 0, 0.1)';
      
      // Create grid lines
      for (let i = 0; i < fabricCanvasRef.current.width!; i += gridSize) {
        const vLine = new fabric.Line([i, 0, i, fabricCanvasRef.current.height!], {
          stroke: gridColor,
          selectable: false,
          evented: false,
          excludeFromExport: true
        });
        fabricCanvasRef.current.add(vLine);
        vLine.sendToBack();
      }
      
      for (let i = 0; i < fabricCanvasRef.current.height!; i += gridSize) {
        const hLine = new fabric.Line([0, i, fabricCanvasRef.current.width!, i], {
          stroke: gridColor,
          selectable: false,
          evented: false,
          excludeFromExport: true
        });
        fabricCanvasRef.current.add(hLine);
        hLine.sendToBack();
      }
      
      fabricCanvasRef.current.renderAll();
    } else {
      // Remove grid lines
      const objects = fabricCanvasRef.current.getObjects();
      const gridLines = objects.filter(obj => 
        obj.type === 'line' && 
        !(obj as any).isUserCreated
      );
      
      gridLines.forEach(line => {
        fabricCanvasRef.current!.remove(line);
      });
      
      fabricCanvasRef.current.renderAll();
    }
  };

  // Expose methods to parent component through ref
  useImperativeHandle(ref, () => ({
    canvas: fabricCanvasRef.current,
    selectedElement,
    // Existing methods
    addHeader: () => {
      if (!fabricCanvasRef.current) return;
      templates.ecommerce.header(fabricCanvasRef.current);
      fabricCanvasRef.current.renderAll();
    },
    addHeroSection: () => {
      if (!fabricCanvasRef.current) return;
      templates.ecommerce.heroSection(fabricCanvasRef.current);
      fabricCanvasRef.current.renderAll();
    },
    addProductGrid: () => {
      if (!fabricCanvasRef.current) return;
      templates.ecommerce.productGrid(fabricCanvasRef.current);
      fabricCanvasRef.current.renderAll();
    },
    addFooter: () => {
      if (!fabricCanvasRef.current) return;
      templates.ecommerce.footer(fabricCanvasRef.current);
      fabricCanvasRef.current.renderAll();
    },
    addRectangle: () => {
      if (!fabricCanvasRef.current) return;
      
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        width: 100,
        height: 100,
        fill: 'transparent',
        stroke: '#000000',
        strokeWidth: 2,
      });

      fabricCanvasRef.current.add(rect);
      fabricCanvasRef.current.setActiveObject(rect);
    },
    addText: () => {
      if (!fabricCanvasRef.current) return;
      
      const text = new fabric.IText('Text', {
        left: 100,
        top: 100,
        fontFamily: 'Arial',
        fontSize: 20,
        fill: '#000000',
      });

      fabricCanvasRef.current.add(text);
      fabricCanvasRef.current.setActiveObject(text);
    },
    addImage: (url: string = 'placeholder.svg') => {
      if (!fabricCanvasRef.current) return;
      
      fabric.Image.fromURL(`/${url}`, (img) => {
        img.set({
          left: 100,
          top: 100,
          width: 150,
          height: 150,
        });
        
        fabricCanvasRef.current?.add(img);
        fabricCanvasRef.current?.setActiveObject(img);
      });
    },
    // New methods
    addCard: () => {
      if (!fabricCanvasRef.current) return;
      templates.ecommerce.card(fabricCanvasRef.current);
      fabricCanvasRef.current.renderAll();
    },
    addForm: () => {
      if (!fabricCanvasRef.current) return;
      templates.ecommerce.form(fabricCanvasRef.current);
      fabricCanvasRef.current.renderAll();
    },
    addSearchBar: () => {
      if (!fabricCanvasRef.current) return;
      templates.ecommerce.searchBar(fabricCanvasRef.current);
      fabricCanvasRef.current.renderAll();
    },
    addNavBar: () => {
      if (!fabricCanvasRef.current) return;
      templates.ecommerce.navBar(fabricCanvasRef.current);
      fabricCanvasRef.current.renderAll();
    },
    addCallToAction: () => {
      if (!fabricCanvasRef.current) return;
      templates.ecommerce.callToAction(fabricCanvasRef.current);
      fabricCanvasRef.current.renderAll();
    },
    addTestimonial: () => {
      if (!fabricCanvasRef.current) return;
      templates.ecommerce.testimonial(fabricCanvasRef.current);
      fabricCanvasRef.current.renderAll();
    },
    addPricingTable: () => {
      if (!fabricCanvasRef.current) return;
      templates.ecommerce.pricingTable(fabricCanvasRef.current);
      fabricCanvasRef.current.renderAll();
    },
    addSection: (title: string = "Section Title", description: string = "Section description text") => {
      if (!fabricCanvasRef.current) return;
      templates.ecommerce.section(fabricCanvasRef.current, title, description);
      fabricCanvasRef.current.renderAll();
    },
    addDashboardHeader: () => {
      if (!fabricCanvasRef.current) return;
      templates.dashboard.header(fabricCanvasRef.current);
      fabricCanvasRef.current.renderAll();
    },
    addDashboardContent: () => {
      if (!fabricCanvasRef.current) return;
      templates.dashboard.content(fabricCanvasRef.current);
      fabricCanvasRef.current.renderAll();
    },
    toggleGrid: (show: boolean) => {
      toggleGrid(show);
    },
    // Enhanced selection methods
    selectObject: (obj: fabric.Object) => {
      if (!fabricCanvasRef.current) return;
      fabricCanvasRef.current.setActiveObject(obj);
      fabricCanvasRef.current.renderAll();
    },
    
    deselectAll: () => {
      if (!fabricCanvasRef.current) return;
      fabricCanvasRef.current.discardActiveObject();
      fabricCanvasRef.current.renderAll();
    },
    
    deleteSelected: () => {
      if (!fabricCanvasRef.current) return;
      const activeObject = fabricCanvasRef.current.getActiveObject();
      if (activeObject) {
        fabricCanvasRef.current.remove(activeObject);
        fabricCanvasRef.current.renderAll();
        setSelectedElement(null);
      }
    },
    
    bringToFront: () => {
      if (!fabricCanvasRef.current) return;
      const activeObject = fabricCanvasRef.current.getActiveObject();
      if (activeObject) {
        activeObject.bringToFront();
        fabricCanvasRef.current.renderAll();
      }
    },
    
    sendToBack: () => {
      if (!fabricCanvasRef.current) return;
      const activeObject = fabricCanvasRef.current.getActiveObject();
      if (activeObject) {
        activeObject.sendToBack();
        fabricCanvasRef.current.renderAll();
      }
    },
  }));

  return (
    <div className="w-full h-full overflow-auto bg-white">
      <canvas ref={canvasRef} />
    </div>
  );
});

WireframeCanvas.displayName = 'WireframeCanvas';

export default WireframeCanvas; 