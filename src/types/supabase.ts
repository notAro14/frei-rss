export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      feed: {
        Row: {
          created_at: string | null
          id: string
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          url?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
