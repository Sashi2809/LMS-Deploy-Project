import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

const UserCard = ({ textLines, imageUrl, linkText, linkUrl }) => {
  return (
    <Card className="w-80 shadow-lg rounded-lg">
      {/* Comment Symbol at the Top */}
      <CardHeader className="flex">
        <span role="img" aria-label="comment" className="text-5xl">
          ❝
        </span>
      </CardHeader>

      {/* Text Content */}
      <CardContent>
        {textLines.map((line, index) => (
          <p key={index} className="text-sm text-gray-600">
            {line}
          </p>
        ))}
      </CardContent>

      {/* Circular User Photo */}
      <CardContent className="flex">
        <Avatar className="h-16 w-16">
          <AvatarImage src={imageUrl} alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </CardContent>

      {/* Link at the Bottom */}
      <CardFooter className="flex">
        <a href={linkUrl} className="text-blue-500 hover:text-blue-700">
          {linkText}
        </a>
      </CardFooter>
    </Card>
  );
};

export default UserCard;