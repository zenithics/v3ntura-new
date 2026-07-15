import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/isAdmin'
import { isAdminOrEditor } from '../access/isAdminOrEditor'

export const DataRequests: CollectionConfig = {
  slug: 'data-requests',
  labels: { singular: 'Data Request', plural: 'Data Requests' },
  admin: {
    useAsTitle: 'requestType',
    defaultColumns: ['requestType', 'email', 'status', 'createdAt', 'fulfilledAt'],
    group: 'Privacy & Compliance',
    description: 'GDPR data subject requests (export, erasure, rectification).',
  },
  access: {
    create: isAdminOrEditor,
    read: isAdminOrEditor,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'requestType',
      type: 'select',
      required: true,
      options: [
        { label: '📄 Data Export (Article 15/20)', value: 'export' },
        { label: '🗑️ Data Erasure (Article 17)', value: 'erasure' },
        { label: '✏️ Rectification (Article 16)', value: 'rectification' },
      ],
      admin: {
        description: 'Type of data subject request.',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Subject Email',
      admin: {
        description: 'Email address of the data subject.',
      },
    },
    {
      name: 'subjectName',
      type: 'text',
      label: 'Subject Name',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: '⏳ Pending', value: 'pending' },
        { label: '🔄 In Progress', value: 'in_progress' },
        { label: '✅ Fulfilled', value: 'fulfilled' },
        { label: '❌ Rejected', value: 'rejected' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Admin Notes',
      admin: {
        description: 'Internal notes about this request.',
      },
    },
    {
      name: 'rejectionReason',
      type: 'text',
      label: 'Rejection Reason',
      admin: {
        condition: (_, siblingData) => siblingData?.status === 'rejected',
        description: 'Why this request was rejected (e.g. cannot verify identity).',
      },
    },
    {
      name: 'fulfilledAt',
      type: 'date',
      label: 'Fulfilled Date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        condition: (_, siblingData) => siblingData?.status === 'fulfilled',
      },
    },
    {
      name: 'exportData',
      type: 'json',
      label: 'Export Data',
      admin: {
        readOnly: true,
        description:
          'Auto-generated data export (JSON). Only populated for export requests.',
        condition: (_, siblingData) => siblingData?.requestType === 'export',
      },
    },
    {
      name: 'erasureLog',
      type: 'json',
      label: 'Erasure Log',
      admin: {
        readOnly: true,
        description:
          'Log of what data was anonymised. Only populated for erasure requests.',
        condition: (_, siblingData) => siblingData?.requestType === 'erasure',
      },
    },
    {
      name: 'processAction',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/DataRequestActions',
        },
      },
    },
  ],
  timestamps: true,
}
