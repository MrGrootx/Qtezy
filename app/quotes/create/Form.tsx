"use client";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LoaderCircle, SendIcon } from "lucide-react";
import categories from "@/datas/Categories";
import { Label } from "@/components/ui/label";
import usePostQuote from "@/hooks/usePostQuote";
import { toast } from "sonner";

const QuoteForm = ({
  topic,
  setTopic,
  setAuthor,
  author,
}: {
  topic: string;
  author: string;
  setTopic: React.Dispatch<React.SetStateAction<string>>;
  setAuthor: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("message", topic);
    setValue("name", author);
  }, [topic, author, setValue]);

  const {
    mutateAsync: postQuote,
    isPending,
  } = usePostQuote({
    onSuccess: (data) => {
      toast.success("Quote submitted successfully!");
    },
    onError: (error) => {
      toast.error("Failed to submit quote");
      console.error(error);
    },
  });
  const onSubmit = (data: any) => {
    postQuote({
      text: data.message,
      author: data.name,
      category: data.category,
      createdAt: new Date(),
    });

    setTopic("");
    setAuthor("");
    setValue("message", "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid w-full gap-3">
        <Label htmlFor="message">Quote Text *</Label>
        <Textarea
          id="message"
          placeholder="Enter your quote here..."
          maxLength={500}
          className="resize-none"
          rows={4}
          {...register("message", {
            required: "Quote text is required",
            onChange: (e) => setTopic(e.target.value),
          })}
          value={topic}
          autoComplete="off"
          onChange={(e) => setTopic(e.target.value)}
        />
        {errors.message && (
          <p className="text-red-500 text-sm">
            {errors.message.message as string}
          </p>
        )}

        <Label htmlFor="name">Author</Label>
        <Input
          id="name"
          autoComplete="off"
          placeholder="e.g. justgroot"
          className="w-full"
          {...register("name", {
            onChange: (e) => setAuthor(e.target.value),
          })}
        />

        <Label htmlFor="category" className="w-full block">
          Category *
        </Label>
        <Controller
          control={control}
          name="category"
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value ?? ""}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.category && (
          <p className="text-red-500 text-sm">
            {errors.category.message as string}
          </p>
        )}

        <div className="dark:bg-black/30 rounded p-3 mt-4">
          <Label htmlFor="quote" className="block w-full mb-2">
            Submission Guidelines
          </Label>
          <ul className="list-disc px-5">
            {[
              "Quotes must be meaningful and appropriate",
              "All submissions are reviewed before publication",
              "Original quotes are welcome and encouraged",
              "Please ensure accuracy for attributed quotes",
            ].map((text, index) => (
              <li
                key={index}
                className="text-sm dark:text-white/70 tracking-wider"
                style={{ fontFamily: "Kanit, sans-serif" }}
              >
                {text}
              </li>
            ))}
          </ul>
        </div>

        <Button
          className="w-full hover:cursor-pointer"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <LoaderCircle className="mr-2 animate-spin" />
          ) : (
            <SendIcon className="mr-2" />
          )}
          Submit Quote
        </Button>
      </div>
    </form>
  );
};

export default QuoteForm;
