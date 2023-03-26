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
      article: {
        Row: {
          created_at: string | null
          fk_feed_id: string
          id: string
          pub_date: string
          title: string
          url: string
        }
        Insert: {
          created_at?: string | null
          fk_feed_id: string
          id?: string
          pub_date: string
          title: string
          url: string
        }
        Update: {
          created_at?: string | null
          fk_feed_id?: string
          id?: string
          pub_date?: string
          title?: string
          url?: string
        }
      }
      feed: {
        Row: {
          created_at: string | null
          name: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          name?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          name?: string | null
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
