"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
]

interface LanguageSelectorFieldProps {
  selectedLanguage?: { code: string; name: string; flag: string }
  onLanguageChange?: (language: { code: string; name: string; flag: string }) => void
}

export function LanguageSelectorField({
  selectedLanguage = languages[0],
  onLanguageChange,
}: LanguageSelectorFieldProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(selectedLanguage)

  const handleSelect = (language: (typeof languages)[0]) => {
    setSelected(language)
    if (onLanguageChange) {
      onLanguageChange(language)
    }
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-teal-500/20 hover:bg-teal-500/10 focus-visible:ring-teal-500/50"
        >
          <div className="flex items-center">
            <span className="mr-2">{selected.flag}</span>
            <span>{selected.name}</span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map((language) => (
                <CommandItem key={language.code} value={language.name} onSelect={() => handleSelect(language)}>
                  <span className="mr-2">{language.flag}</span>
                  {language.name}
                  <Check
                    className={`ml-auto h-4 w-4 ${selected.code === language.code ? "opacity-100" : "opacity-0"}`}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
