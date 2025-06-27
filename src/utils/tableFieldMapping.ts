import type { TableColumn } from "../types/tables";

export interface TableField {
  name: string;
  type: "string" | "number" | "date" | "boolean";
  label: string;
}

// Mapeamento de labels amigáveis para campos comuns
const FIELD_LABEL_MAPPING: Record<string, string> = {
  // IDs básicos
  ID_ADDRESS: "ID do Endereço",
  ID_COMPANY: "ID da Empresa",
  ID_DEPARTMENT: "ID do Departamento",
  ID_MATERIAL: "ID do Material",
  ID_OFFICE_GROUP: "ID do Grupo de Escritório",
  ID_COLLABORATOR: "ID do Colaborador",
  ID_PROVIDER: "ID do Fornecedor",
  ID_CUSTOMER: "ID do Cliente",
  ID_CEST: "ID do CEST",
  ID_FISCAL_CLASS: "ID da Classe Fiscal",
  ID_FISCAL_TYPE: "ID do Tipo Fiscal",
  ID_COUNTRY_OF_ORIGIN: "ID do País de Origem",
  ID_MEASUREMENT_UNIT: "ID da Unidade de Medida",
  ID_PAYMENT_TERM: "ID do Termo de Pagamento",
  ID_PROVIDER_CATEGORIZATION: "ID da Categorização",
  ID_PROVIDER_HOMOLOGATION: "ID da Homologação",
  ID_PROVIDER_PARAM: "ID dos Parâmetros",
  ID_QUOTATION_ITEM_FIXED_LAST_BUY: "ID da Última Compra",
  ID_FAMILY: "ID da Família",
  ID_FILTER_ROLE_RULE: "ID da Regra de Filtro",
  ID_INTEGRATION: "ID da Integração",
  ID_MASTER_GROUP: "ID do Grupo Mestre",
  ID_BUYER: "ID do Comprador",
  ID_PAYER: "ID do Pagador",
  ID_SHIPPING_COMPANY: "ID da Transportadora",
  ID_CUSTOMER_OFFICE_GROUP: "ID do Grupo do Cliente",
  ID_PARENT_MATERIAL: "ID do Material Pai",
  ID_LAST_REQUEST_PROCESS_GENERATED: "ID do Último Processo de Solicitação",
  ID_LAST_ORDER_PROCESS_GENERATED: "ID do Último Processo de Pedido",

  // IDs adicionais
  ID_AVAILABLE_SOURCE: "ID da Fonte Disponível",
  ID_PRICE_RANGE: "ID da Faixa de Preço",
  ID_BRAND: "ID da Marca",
  ID_CONTRACT_ITEM: "ID do Item do Contrato",
  ID_CONTRACT_PROCESS: "ID do Processo do Contrato",
  ID_DASHBOARD_CONTENT: "ID do Conteúdo do Dashboard",
  ID_DEFAULT_RESPONSIBLE: "ID do Responsável Padrão",
  ID_DEFAULT_ROLE: "ID do Papel Padrão",
  ID_EMAIL: "ID do E-mail",
  ID_EMAIL_ATTACHMENT: "ID do Anexo do E-mail",
  ID_EMAIL_MODEL: "ID do Modelo de E-mail",
  ID_EMAIL_RECIPIENT: "ID do Destinatário do E-mail",
  ID_FOLLOW_UP_ITEM: "ID do Item de Follow-up",
  ID_GLOBAL_PARAM: "ID do Parâmetro Global",
  ID_HELPER_CONFIG: "ID da Configuração de Ajuda",
  ID_ICMS: "ID do ICMS",
  ID_ICMS_ST: "ID do ICMS ST",
  ID_INTEGRATION_CONSUMPTION: "ID do Consumo de Integração",
  ID_INVOICING_PROCESS: "ID do Processo de Faturamento",
  ID_MANUFACTURER: "ID do Fabricante",
  ID_MATERIAL_GROUP: "ID do Grupo de Material",
  ID_MATERIAL_SUBGROUP: "ID do Subgrupo de Material",
  ID_MODULE: "ID do Módulo",
  ID_ORDER_DELIVERY_CHANGE: "ID da Mudança de Entrega",
  ID_ORDER_ITEM: "ID do Item do Pedido",
  ID_ORDER_PROCESS: "ID do Processo do Pedido",
  ID_PARTICIPANT: "ID do Participante",
  ID_PARTICIPANT_DATA: "ID dos Dados do Participante",
  ID_PARTICIPANT_DOCUMENT: "ID do Documento do Participante",
  ID_PARTICIPANT_QUEUE_PROCESSING: "ID do Processamento da Fila",
  ID_PARTICIPANT_SANITATION: "ID da Sanitização do Participante",
  ID_PAYMENT_FORM: "ID da Forma de Pagamento",
  ID_PLAN: "ID do Plano",
  ID_PRE_ORDER: "ID do Pré-Pedido",
  ID_PRE_REGISTRATION_PROCESS: "ID do Processo de Pré-Cadastro",
  ID_PROVIDER_ANSWER_PARAM: "ID do Parâmetro de Resposta",
  ID_PROVIDER_CODE: "ID do Código do Fornecedor",
  ID_QUOTATION_ITEM: "ID do Item da Cotação",
  ID_QUOTATION_ITEM_BRAND: "ID da Marca do Item da Cotação",
  ID_QUOTATION_PROCESS: "ID do Processo de Cotação",
  ID_QUOTATION_PROVIDER_ITEM_BRAND: "ID da Marca do Item do Fornecedor",
  ID_QUOTATION_PROVIDER_SUBPROCESS: "ID do Subprocesso do Fornecedor",
  ID_CONFIRMED_SHIPPING: "ID do Envio Confirmado",
  ID_RECEIVEMENT_PROCESS: "ID do Processo de Recebimento",
  ID_REQUEST_ITEM: "ID do Item da Solicitação",
  ID_REQUEST_ITEM_BRAND: "ID da Marca do Item da Solicitação",
  ID_REQUEST_PROCESS: "ID do Processo de Solicitação",
  ID_SERVICE_ITEM: "ID do Item de Serviço",
  ID_SERVICE_MATERIAL: "ID do Material de Serviço",
  ID_SERVICE_PROCESS: "ID do Processo de Serviço",
  ID_TASK: "ID da Tarefa",
  ID_CLONE_ORDER: "ID do Pedido Clonado",
  ID_CLONE_QUOTATION: "ID da Cotação Clonada",
  ID_CLONE_CONTRACT: "ID do Contrato Clonado",
  ID_PARENT_ORDER: "ID do Pedido Pai",
  ID_PARENT_QUOTATION: "ID da Cotação Pai",
  ID_PARENT_QUOTATION_ITEM: "ID do Item da Cotação Pai",
  ID_PARENT_QUOTATION_ITEM_BRAND: "ID da Marca do Item da Cotação Pai",
  ID_PRE_REGISTRATION_COMPANY_TO_INVITE: "ID da Empresa para Convidar",
  ID_LAST_BUY_FIXED_SOURCE: "ID da Fonte Fixa da Última Compra",

  // Descrições e nomes básicos
  DESCRIPTION: "Descrição",
  NAME: "Nome",
  FANTASY_NAME: "Nome Fantasia",
  CODE: "Código",
  ERP_CODE: "Código ERP",
  DETAIL: "Detalhes",

  // Endereços
  MUNICIPAL_REGISTRATION: "Inscrição Municipal",
  IS_BILLING_ADDRESS: "É Endereço de Cobrança",
  ZIP_CODE: "CEP",
  ADDRESS: "Endereço",
  NUMBER: "Número",
  COMPLEMENT: "Complemento",
  NEIGHBORHOOD: "Bairro",
  CITY: "Cidade",
  FEDERATED_UNIT: "UF",
  POSSIBLE_DTT_RECEIPT: "Data Possível Recebimento",

  // Empresa
  KIND: "Tipo",
  PROFILE: "Perfil",
  STATUS: "Status",
  CNPJ: "CNPJ",
  CPF: "CPF",
  IS_INDIVIDUAL_CHARGE: "É Cobrança Individual",
  STATE_REGISTRATION: "Inscrição Estadual",
  FINANCIAL_EMAIL: "E-mail Financeiro",
  FINANCIAL_EMAIL_2: "E-mail Financeiro 2",
  COMERCIAL_EMAIL: "E-mail Comercial",
  COMERCIAL_EMAIL_2: "E-mail Comercial 2",
  FINANCIAL_PHONE: "Telefone Financeiro",
  COMERCIAL_PHONE: "Telefone Comercial",
  PROVIDER_CLASSIFICATION: "Classificação do Fornecedor",

  // Colaborador
  ROLE: "Cargo",
  PHONE: "Telefone",
  USER: "Usuário",
  IS_PRE_ORDER_APPROVER: "É Aprovador de Pré-Pedido",

  // Material
  PHYSICAL_FEATURES: "Características Físicas",
  PACKAGE: "Embalagem",
  BRAND: "Marca",
  BRAND_MANUFACTURER_REFERENCE: "Referência do Fabricante",
  EAN: "EAN",
  REFERENCE_SOURCE: "Fonte de Referência",
  CONVERSION_FACTOR: "Fator de Conversão",
  FACTOR_UNIT: "Unidade do Fator",
  APPLICATION: "Aplicação",
  CUSTOMER_NCM: "NCM do Cliente",
  NCM: "NCM",
  CUSTOMER_MATERIAL_CODE: "Código do Material do Cliente",
  PROVIDER_CODE: "Código do Fornecedor",
  PROVIDER_NCM: "NCM do Fornecedor",

  // Status/Estado
  IS_ACTIVE: "Está Ativo",
  IS_NEXT_BUSINESS_DAY: "É Próximo Dia Útil",

  // Auditoria
  AUDITED_CREATED_AT: "Criado em",
  AUDITED_CHANGED_AT: "Alterado em",
  CREATED_AT: "Criado em",

  // Valores financeiros e comerciais
  PRICE: "Preço",
  TOTAL_VALUE: "Valor Total",
  TOTAL_WITH_DISCOUNT: "Total com Desconto",
  TOTAL_WITH_TAX: "Total com Impostos",
  UNITY_TOTAL: "Total Unitário",
  UNITY_TOTAL_WITH_DISCOUNT: "Total Unitário com Desconto",
  UNITY_TOTAL_WITH_DIFAL: "Total Unitário com DIFAL",
  TOTAL_VALUE_WITH_DIFAL: "Valor Total com DIFAL",
  TOTAL_WITH_TAX_AND_DIFAL: "Total com Impostos e DIFAL",
  DISCOUNT_VALUE: "Valor do Desconto",
  DISCOUNT_TYPE: "Tipo de Desconto",
  DISCOUNT_QUANTITY: "Quantidade de Desconto",
  NEGOTIATED_VALUE: "Valor Negociado",
  NEGOTIATED_PRICE: "Preço Negociado",
  NEGOTIATED_ST: "ST Negociado",
  NEGOTIATED_TOTAL: "Total Negociado",
  NEGOTIATED_ICMS_BASE: "Base ICMS Negociada",
  NEGOTIATED_DIFAL: "DIFAL Negociado",
  negotiated_ipi: "IPI Negociado",
  BEST_PRICE: "Melhor Preço",
  BEST_PRICE_TOTAL: "Total do Melhor Preço",
  BEST_PRICE_SAVING_PERCENT: "Percentual de Economia do Melhor Preço",
  BEST_PRICE_SAVING_VALUE: "Valor de Economia do Melhor Preço",
  LAST_BUY_SAVING_PERCENT: "Percentual de Economia da Última Compra",
  LAST_BUY_SAVING_VALUE: "Valor de Economia da Última Compra",
  TOTAL_LAST_BUY_VALUE: "Valor Total da Última Compra",
  UNITY_LAST_BUY_VALUE: "Valor Unitário da Última Compra",
  PROVIDER_ANSWER_VALUE: "Valor da Resposta do Fornecedor",
  INITIAL_NEGOTIATED_VALUE: "Valor Inicial Negociado",
  CALCULATED_DISCOUNT_PERCENT: "Percentual de Desconto Calculado",
  CALCULATED_DISCOUNT_VALUE: "Valor de Desconto Calculado",
  VALUE: "Valor",
  CURRENCY: "Moeda",
  CREDIT_COST: "Custo do Crédito",
  CREDIT_PRICE: "Preço do Crédito",
  EXCEEDED_CREDIT_PRICE: "Preço do Crédito Excedido",
  CREDIT_PRICE_GOVERNANCE: "Governança do Preço do Crédito",
  EXCEEDED_CREDIT_PRICE_GOVERNANCE: "Governança do Preço do Crédito Excedido",
  TOTAL_CREDIT_PRICE: "Preço Total do Crédito",
  CREDIT_AMOUNT: "Valor do Crédito",
  SHIPPING_PRICE: "Preço do Frete",
  FROM_BILLING_VALUE: "Valor de Cobrança De",
  TO_BILLING_VALUE: "Valor de Cobrança Até",

  // Impostos
  DIFAL: "DIFAL",
  ST: "ST",
  IPI: "IPI",
  ICMS_BASE: "Base ICMS",
  ICMS: "ICMS",
  ISS: "ISS",
  TAX_TOTAL: "Total de Impostos",
  UNITY_TAX_TOTAL: "Total Unitário de Impostos",
  RELATIVE_IPI: "IPI Relativo",
  RELATIVE_ST: "ST Relativo",
  RELATIVE_ICMS_BASE: "Base ICMS Relativa",
  RELATIVE_DIFAL: "DIFAL Relativo",
  ALIQUOTE: "Alíquota",

  // Quantidades
  QUANTITY: "Quantidade",
  ANSWER_QUANTITY: "Quantidade Respondida",
  BRAND_QUANTITY: "Quantidade da Marca",
  CONFIRMED_QUANTITY: "Quantidade Confirmada",
  ORDER_QUANTITY: "Quantidade do Pedido",
  PUBLIC_QUOTATION_QUANTITY: "Quantidade da Cotação Pública",
  REDEFINITION_QUANTITY: "Quantidade de Redefinição",
  REOPEN_QUANTITY: "Quantidade de Reabertura",
  ITEM_QUANTITY: "Quantidade de Itens",
  PHYSICAL_QUANTITY: "Quantidade Física",
  RETURNED_QUANTITY: "Quantidade Devolvida",
  PHYSICAL_RETURNED_QUANTITY: "Quantidade Física Devolvida",
  INVOICE_QUANTITY: "Quantidade da Nota Fiscal",
  INITIAL_BALANCE: "Saldo Inicial",
  BALANCE: "Saldo",

  // Datas
  DT_DELIVERY: "Data de Entrega",
  DT_NECESSITY: "Data de Necessidade",
  DT_ORDER_ISSUED: "Data de Emissão do Pedido",
  DT_INVOICE_ISSUED: "Data de Emissão da Nota Fiscal",
  DT_CONTRACT_START: "Data de Início do Contrato",
  DT_CONTRACT_END: "Data de Fim do Contrato",
  DT_LAST_ORDER: "Data do Último Pedido",
  DT_FIXED_LAST_BUY: "Data da Última Compra Fixa",
  DT_NASCIMENTO: "Data de Nascimento",
  DTT_DEADLINE: "Prazo",
  DTT_PUBLISH_OS: "Data/Hora de Publicação da OS",
  DTT_PROCESSING: "Data/Hora de Processamento",
  CONFIRMED_DT_DELIVERY: "Data de Entrega Confirmada",
  NEW_DT_DELIVERY: "Nova Data de Entrega",

  // Dias e prazos
  DELIVERY_DAYS: "Dias de Entrega",
  CONFIRMED_DELIVERY_DAYS: "Dias de Entrega Confirmados",
  NEW_DELIVERY_DAYS: "Novos Dias de Entrega",
  DEFAULT_QUOTATION_DEADLINE: "Prazo Padrão da Cotação",

  // Parâmetros do fornecedor
  SHIPMENT_TYPE: "Tipo de Envio",
  SHIPPING_COMPANY_STR: "Transportadora",
  SHIPPING_ADDRESS: "Endereço de Entrega",

  // Última compra
  CUSTOMER_CODE: "Código do Cliente",
  PROVIDER_NAME: "Nome do Fornecedor",
  MEASUREMENT_UNIT: "Unidade de Medida",
  PAYMENT_TERM_DESCRIPTION: "Descrição do Termo de Pagamento",
  SOURCE: "Origem",
  PARAM_SOURCE: "Fonte do Parâmetro",
  BRAND_SOURCE: "Fonte da Marca",

  // E-mails
  SUBJECT: "Assunto",
  HTML_BODY: "Corpo HTML",
  SENDER: "Remetente",
  EMAIL: "E-mail",
  QUEUE_SITUATION: "Situação da Fila",
  ATTEMPT: "Tentativa",

  // Anexos e URLs
  ATTACHMENT_URL: "URL do Anexo",
  ARCHIVE_URL: "URL do Arquivo",
  SERVICE_API: "API de Serviço",
  SITE_URL: "URL do Site",
  LOGO_URL: "URL do Logo",
  API_RECEIPT_URL: "URL de Recebimento da API",
  SITES_RECEIPT_URLS: "URLs de Recebimento dos Sites",
  DOCUMENT_URL: "URL do Documento",
  SANITATION_RECEIVED_URL: "URL de Recebimento da Sanitização",
  SANITIZED_ARCHIVE_URL: "URL do Arquivo Sanitizado",
  LOG_URL: "URL do Log",
  RECEIPT_URL: "URL de Recebimento",
  INVOICE_URL: "URL da Nota Fiscal",
  PROVIDER_ANSWER_URL: "URL da Resposta do Fornecedor",
  TEMP_ACCESS_URL: "URL de Acesso Temporário",
  TERMS_AND_CONDITIONS_URL: "URL dos Termos e Condições",
  CUSTOMER_HELP_URL: "URL de Ajuda do Cliente",
  PROVIDER_HELP_URL: "URL de Ajuda do Fornecedor",

  // Configurações específicas
  INPUT_TYPE: "Tipo de Entrada",
  CUSTOMIZATION: "Customização",
  MODULE: "Módulo",
  TYPE: "Tipo",
  AVAILABLE_TO: "Disponível Para",
  PROCESS_CODE: "Código do Processo",
  ALL_REQUIRED: "Todos Obrigatórios",
  ANY_REQUIRED: "Qualquer Obrigatório",
  VIEW_NAME: "Nome da Visualização",
  METHOD: "Método",
  RESULT_CODE: "Código do Resultado",

  // Status de processos
  PROVIDER_STATUS: "Status do Fornecedor",
  CUSTOMER_STATUS: "Status do Cliente",
  ITEM_STATUS: "Status do Item",
  ORIGINAL_ITEM_STATUS: "Status Original do Item",
  CONTRACT_STATUS: "Status do Contrato",
  ANSWERED_TOTAL_ITEMS_STATUS: "Status Total de Itens Respondidos",
  END_TYPE: "Tipo de Fim",

  // Números e códigos de processo
  PROCESS_NUMBER: "Número do Processo",
  CUSTOMER_NUMBER: "Número do Cliente",
  REQUEST_NUMBER: "Número da Solicitação",
  PROPOSAL_NUMBER: "Número da Proposta",
  CONTRACT_NUMBER: "Número do Contrato",
  INVOICE_NUMBER: "Número da Nota Fiscal",
  SEQUENCIAL_ID: "ID Sequencial",
  DUPLICATED_ID: "ID Duplicado",
  BUY_ORDER: "Ordem de Compra",

  // Responsáveis e usuários
  REQUESTER: "Solicitante",
  SELLER: "Vendedor",
  RESPONSIBLE_DEPARTMENT: "Departamento Responsável",
  CANCELED_BY: "Cancelado Por",
  DEFINE_NEXT_RESPONSIBLE: "Definir Próximo Responsável",
  DEFINE_NEXT_TASK: "Definir Próxima Tarefa",
  USER_RESPONSIBLE: "Usuário Responsável",
  ANSWERED_BY_PROFILE: "Respondido Pelo Perfil",

  // Tarefas
  STEP_BY_STEP_TASK: "Tarefa Passo a Passo",
  PREVIOUS_TASK_NAME: "Nome da Tarefa Anterior",
  CURRENT_TASK_NAME: "Nome da Tarefa Atual",
  TASK_ID: "ID da Tarefa",
  PARENT_TASK_ID: "ID da Tarefa Pai",

  // Aprovações
  COMMERCIAL_APPROVAL: "Aprovação Comercial",
  COMMERCIAL_APPROVAL_DETAIL: "Detalhes da Aprovação Comercial",
  HAS_SECOND_COMMERCIAL_APPROVAL: "Possui Segunda Aprovação Comercial",
  HAS_THIRD_COMMERCIAL_APPROVAL: "Possui Terceira Aprovação Comercial",
  SECOND_COMMERCIAL_APPROVAL_DETAIL: "Detalhes da Segunda Aprovação Comercial",
  THIRD_COMMERCIAL_APPROVAL_DETAIL: "Detalhes da Terceira Aprovação Comercial",
  FOURTH_COMMERCIAL_APPROVAL_DETAIL: "Detalhes da Quarta Aprovação Comercial",
  HAS_FOURTH_COMMERCIAL_APPROVAL: "Possui Quarta Aprovação Comercial",
  HAS_APPROVAL: "Possui Aprovação",
  HAS_SECOND_APPROVAL: "Possui Segunda Aprovação",
  HAS_THIRD_APPROVAL: "Possui Terceira Aprovação",
  APPROVAL_DETAIL: "Detalhes da Aprovação",
  SECOND_APPROVAL_DETAIL: "Detalhes da Segunda Aprovação",
  THIRD_APPROVAL_DETAIL: "Detalhes da Terceira Aprovação",
  PRE_ORDER_APPROVER: "Aprovador do Pré-Pedido",

  // Campos de controle
  IS_PUBLISH: "É Para Publicar",
  IS_REJECTED: "É Rejeitado",
  IS_CONFIRMED: "É Confirmado",
  IS_NEGOTIATED: "É Negociado",
  IS_ANSWERED: "É Respondido",
  IS_INVOICE_ITEM: "É Item da Nota Fiscal",
  IS_CANCELED: "É Cancelado",
  IS_CONTRACT_ITEM: "É Item de Contrato",
  IS_REOPEN_OR_REDEFINITION: "É Reabertura ou Redefinição",
  HAS_NEW_PUBLISH: "Possui Nova Publicação",
  IS_RENEW_CONTRACT: "É Renovação de Contrato",
  IS_CONFIRMED_SHIPPING: "É Envio Confirmado",

  // Categorização e classificação
  ITEM_CATEGORY: "Categoria do Item",
  ITEM_FAMILY: "Família do Item",
  ITEM_SUBFAMILY: "Subfamília do Item",
  ITEM_TYPE: "Tipo do Item",
  ITEM_CLASSIFICATION: "Classificação do Item",
  PRE_ORDER_ORIGIN: "Origem do Pré-Pedido",

  // Campos de configuração avançada do Office Group
  HAS_FOLLOW_UP: "Possui Follow-up",
  HAS_ORDER_MANUAL_OPEN: "Permite Pedido Manual",
  HAS_ORDER_PROCESS: "Possui Processo de Pedido",
  HAS_PARTIAL_APPROVAL: "Permite Aprovação Parcial",
  HAS_PUBLIC_QUOTATION: "Possui Cotação Pública",
  HAS_QUOTATION_MANUAL_OPEN: "Permite Cotação Manual",
  HAS_QUOTATION_PROCESS: "Possui Processo de Cotação",
  IS_ACCEPT_BRAND_SUGGESTION: "Aceita Sugestão de Marca",
  IS_ACCEPT_CHANGE_DEADLINE: "Aceita Mudança de Prazo",
  IS_ACCEPT_SMALLER_QUANTITY: "Aceita Quantidade Menor",
  IS_CAN_REOPEN_BEFORE_NEGOTIATION: "Pode Reabrir Antes da Negociação",
  IS_CAN_REOPEN_IN_NEGOTIATION: "Pode Reabrir em Negociação",
  IS_NCM_REQUIRED: "NCM Obrigatório",
  IS_ORDER_DEPARTMENT_REQUIRED: "Departamento Obrigatório no Pedido",
  IS_PROVIDER_CODE_REQUIRED: "Código do Fornecedor Obrigatório",
  IS_QUOTATION_DEPARTMENT_REQUIRED: "Departamento Obrigatório na Cotação",
  IS_SUGGESTED_BRAND_REQUIRED: "Marca Sugerida Obrigatória",

  // Configurações padrão do Office Group
  ORDER_DEFAULT_ARCHIVE_URL: "URL Padrão de Arquivo do Pedido",
  ORDER_DEFAULT_INFORMATION: "Informação Padrão do Pedido",
  ORDER_DELIVERY_DATE_TYPE: "Tipo de Data de Entrega do Pedido",
  ORDER_ST_TYPE: "Tipo de ST do Pedido",
  PUBLIC_DEFAULT_QUANTITY: "Quantidade Padrão Pública",
  QUOTATION_DEFAULT_ARCHIVE_URL: "URL Padrão de Arquivo da Cotação",
  QUOTATION_DEFAULT_INFORMATION: "Informação Padrão da Cotação",
  QUOTATION_DELIVERY_DATE_TYPE: "Tipo de Data de Entrega da Cotação",
  QUOTATION_ST_TYPE: "Tipo de ST da Cotação",

  // Configurações adicionais do Office Group
  IS_ORDER_CAN_REDEFINE_NEXT_TASK: "Pedido Pode Redefinir Próxima Tarefa",
  IS_QUOTATION_CAN_REDEFINE_NEXT_TASK: "Cotação Pode Redefinir Próxima Tarefa",
  HAS_APPROVE_ORDER_SOURCE_INTEGRATION:
    "Possui Aprovação de Fonte de Pedido por Integração",
  HAS_APPROVE_ORDER_SOURCE_QUOTATION:
    "Possui Aprovação de Fonte de Pedido por Cotação",
  HAS_DEPARTMENT_GROUP_PRE_ORDER:
    "Possui Grupo de Departamento para Pré-Pedido",
  IS_ORDER_DELIVERY_REQUIRED: "Entrega Obrigatória no Pedido",
  IS_QUOTATION_DELIVERY_REQUIRED: "Entrega Obrigatória na Cotação",
  IS_ANALYZE_PUBLISH_ORDER: "É Analisar Publicação do Pedido",
  IS_ANALYZE_PUBLISH_QUOTATION: "É Analisar Publicação da Cotação",
  IS_CALCULATE_ORDER_TOTALS: "É Calcular Totais do Pedido",
  HAS_CATEGORY_GROUPING_REQUEST:
    "Possui Agrupamento de Categoria na Solicitação",
  HAS_COMPANY_GROUPING_REQUEST: "Possui Agrupamento de Empresa na Solicitação",
  HAS_DEPARTMENT_GROUPING_REQUEST:
    "Possui Agrupamento de Departamento na Solicitação",
  HAS_TYPE_GROUPING_REQUEST: "Possui Agrupamento de Tipo na Solicitação",
  IS_CAN_CANCEL_REQUEST_ITEMS: "Pode Cancelar Itens da Solicitação",
  HAS_REQUEST_MONITOR: "Possui Monitor de Solicitação",
  HAS_REQUEST_PROCESS: "Possui Processo de Solicitação",
  ORDER_ICMS_BASE_TYPE: "Tipo de Base ICMS do Pedido",
  QUOTATION_ICMS_BASE_TYPE: "Tipo de Base ICMS da Cotação",
  IS_LAST_BUY_FROM_FIXED_SOURCE: "É Última Compra de Fonte Fixa",
  QUOTATION_DIFAL_TYPE: "Tipo de DIFAL da Cotação",
  ORDER_DIFAL_TYPE: "Tipo de DIFAL do Pedido",
  IS_CUSTOMER_IN_POC: "É Cliente em POC",
  IS_ORDER_CUSTOMER_NUMBER_REQUIRED: "Número do Cliente Obrigatório no Pedido",
  PROVIDER_HOMOLOGATION_TYPE: "Tipo de Homologação do Fornecedor",
  IS_CAN_USE_NON_HOMOLOGATED_PROVIDER: "Pode Usar Fornecedor Não Homologado",
  HAS_GROUP_GROUPING_REQUEST: "Possui Agrupamento de Grupo na Solicitação",
  HAS_SUBGROUP_GROUPING_REQUEST:
    "Possui Agrupamento de Subgrupo na Solicitação",
  HAS_APPROVE_ORDER_SOURCE_SERVICE:
    "Possui Aprovação de Fonte de Pedido por Serviço",
  HAS_SERVICE_MANUAL_OPEN: "Permite Abertura Manual de Serviço",
  HAS_SERVICE_PROCESS: "Possui Processo de Serviço",
  IS_SERVICE_CAN_REDEFINE_NEXT_TASK: "Serviço Pode Redefinir Próxima Tarefa",
  IS_SERVICE_DEPARTMENT_REQUIRED: "Departamento Obrigatório no Serviço",
  SERVICE_DEFAULT_ARCHIVE_URL: "URL Padrão de Arquivo do Serviço",
  SERVICE_DEFAULT_INFORMATION: "Informação Padrão do Serviço",
  SERVICE_DELIVERY_DATE_TYPE: "Tipo de Data de Entrega do Serviço",
  SERVICE_ICMS_BASE_TYPE: "Tipo de Base ICMS do Serviço",
  SERVICE_ST_TYPE: "Tipo de ST do Serviço",
  IS_CRITERION_REQUIRED: "Critério Obrigatório",
  HAS_CUSTOMER_NUMBER_GROUPING_REQUEST:
    "Possui Agrupamento de Número do Cliente na Solicitação",
  HAS_BUYER_GROUPING_REQUEST: "Possui Agrupamento de Comprador na Solicitação",
  ORDER_REPORT_CUSTOM_FIELDS: "Campos Personalizados do Relatório do Pedido",
  ORDER_REPORT_CUSTOM_LAYOUT: "Layout Personalizado do Relatório do Pedido",
  SUGGESTED_BRAND_GENERATES_PRE_ORDER: "Marca Sugerida Gera Pré-Pedido",
  ORDER_REPORT_CUSTOM_IMAGE_URL:
    "URL de Imagem Personalizada do Relatório do Pedido",
  HAS_BUY_ORDER_UPDATE_TASK: "Possui Tarefa de Atualização da Ordem de Compra",
  IS_CUSTOMER_NUMBER_REQUIRED: "Número do Cliente Obrigatório",
  HAS_QUOTATION_FOR_CONTRACT_INTEGRATION:
    "Possui Cotação para Integração de Contrato",
  HAS_MATERIAL_CRUD: "Possui CRUD de Material",
  CONTRACT_ITEMS_GENERATION_JOB_INTERVAL:
    "Intervalo do Job de Geração de Itens de Contrato",
  IS_PRE_ORDER_APPROVER_REQUIRED: "Aprovador de Pré-Pedido Obrigatório",
  IS_PRE_ORDER_SHIPPING_COMPANY_REQUIRED:
    "Transportadora Obrigatória no Pré-Pedido",
  IS_ANALYZE_PUBLISH_CONTRACT: "É Analisar Publicação do Contrato",
  RETURN_NON_HOMOLOGATED_PROVIDERS_ON_API:
    "Retornar Fornecedores Não Homologados na API",
  MATERIAL_CODE_PREFIX: "Prefixo do Código do Material",
  IS_ORDER_CAN_USE_NON_HOMOLOGATED_PROVIDER:
    "Pedido Pode Usar Fornecedor Não Homologado",

  // Campos específicos de processos
  CALLED_FROM: "Chamado De",
  REJECTED_DETAIL: "Detalhes da Rejeição",
  CANCEL_DETAIL: "Detalhes do Cancelamento",
  CHANGE_JUSTIFICATION: "Justificativa da Mudança",
  CONTACT_NAME: "Nome do Contato",
  CUSTOMER_HAS_INTEGRATION: "Cliente Possui Integração",
  PROVIDER_HAS_INTEGRATION: "Fornecedor Possui Integração",
  NEGOTIATE_WITH_PROVIDER: "Negociar com Fornecedor",
  PUBLISH: "Publicar",
  FAVORED_OFFICE_GROUP_OR_COMPANY: "Grupo de Escritório ou Empresa Favorecida",
  GENERAL_DISCOUNT_PROVIDER: "Desconto Geral do Fornecedor",
  GENERAL_DISCOUNT_QUANTITY: "Quantidade de Desconto Geral",
  GENERAL_DISCOUNT_TYPE: "Tipo de Desconto Geral",
  PAYMENT_TERM: "Termo de Pagamento",

  // Campos favorecidos
  ID_FAVORED_CUSTOMER: "ID do Cliente Favorecido",
  ID_FAVORED_OFFICE_GROUP: "ID do Grupo de Escritório Favorecido",
  ID_FAVORED_PROVIDER: "ID do Fornecedor Favorecido",
  ID_FAVORED_CUSTOMER_OFFICE_GROUP: "ID do Grupo do Cliente Favorecido",
  ID_FAVORED_PROVIDER_OFFICE_GROUP: "ID do Grupo do Fornecedor Favorecido",

  // Totalizadores
  TOTALIZER_BEST_PRICE: "Totalizador do Melhor Preço",
  TOTALIZER_LAST_ITEM_PRICE: "Totalizador do Preço do Último Item",
  PRE_ORDERS_TOTAL: "Total de Pré-Pedidos",

  // Campos de pré-cadastro
  TEMP_USER_FIRST_NAME: "Nome Temporário do Usuário",
  TEMP_USER_EMAIL: "E-mail Temporário do Usuário",
  TEMP_USER_PHONE: "Telefone Temporário do Usuário",
  TEMP_USER_DETAIL: "Detalhes Temporários do Usuário",
  OFFICE_GROUP_COMPANY_REQUEST_DECISION:
    "Decisão da Solicitação da Empresa do Grupo",
  OFFICE_GROUP_COMPANY_DETAIL: "Detalhes da Empresa do Grupo",
  ADMIN_PASSWORD: "Senha do Administrador",
  ADMIN_USERNAME: "Nome de Usuário do Administrador",
  BELONGS_TO_COMPANY_OFFICE_GROUP: "Pertence ao Grupo da Empresa",
  NEW_OFFICE_GROUP_NAME: "Nome do Novo Grupo de Escritório",
  REJECT_DETAIL: "Detalhes da Rejeição",
  USER_DECISION: "Decisão do Usuário",
  REQUESTER_PHONE: "Telefone do Solicitante",
  IS_RESEND_INVITE: "É Reenvio de Convite",

  // Campos específicos de sanitização e participantes
  NOME_COMPLETO: "Nome Completo",
  CLASSIFICAR: "Classificar",
  CEP: "CEP",
  UF: "UF",
  IE: "Inscrição Estadual",
  CEI: "CEI",
  PROTOCOLO: "Protocolo",
  PLACA: "Placa",
  RENAVAM: "RENAVAM",
  CDA: "CDA",
  NIRF: "NIRF",
  RNTRC: "RNTRC",
  PIS: "PIS",
  LINHA_EXCEL: "Linha do Excel",
  IDENTIFICACAO: "Identificação",
  ID_REQUESTER: "ID do Solicitante",

  // Campos de notificação e documentos
  NOTICE_CRON: "Cron de Notificação",
  NOTICE: "Notificação",

  // Configurações de plano
  ACTIVE_USER_LIMIT: "Limite de Usuários Ativos",
  PAYMENT_FORMAT: "Formato de Pagamento",

  // Parâmetros globais
  MAX_OUTDATE_PART_DB_DAYS: "Máximo de Dias de BD de Peças Desatualizadas",
  MAX_ATTEMPT_API: "Máximo de Tentativas da API",
  MAX_ATTEMPT_EMAIL: "Máximo de Tentativas de E-mail",

  // Campos de integração
  QUOTATION_INTEGRATION_LOG: "Log de Integração da Cotação",
  ORDER_INTEGRATION_LOG: "Log de Integração do Pedido",
  IS_AWAIT_ORDER_FORMALIZE_INTEGRATION_SUCCESS:
    "Aguardando Sucesso da Integração de Formalização do Pedido",
  IS_ORDER_FORMALIZE: "É Formalização do Pedido",
  HAS_INTEGRATION_RENEGOTIATION: "Possui Renegociação de Integração",
  IS_QUOTATION_FOR_CONTRACT_ITEMS: "É Cotação para Itens de Contrato",

  // Campos de formalização e contratos
  CONTRACT_PURPOSE: "Propósito do Contrato",
  HAS_SENT_EMAIL_FOR_EXPIRING_CONTRACT: "Enviou E-mail para Contrato Expirando",

  // Outros campos específicos
  SUGGESTED_BRAND: "Marca Sugerida",
  CRITERION: "Critério",
  WEIGHT: "Peso",
  BAR_CODE: "Código de Barras",
  BRAND_MANUFACTURER_REF: "Referência do Fabricante da Marca",
  COFINS: "COFINS",
  ITEMS_CODES_SEARCHER: "Pesquisador de Códigos de Itens",
  JSON_RETURN: "Retorno JSON",
  LAW_CODE_116: "Código da Lei 116",

  // Campos de relacionamento
  from_company_id: "ID da Empresa De",
  to_company_id: "ID da Empresa Para",
  contractprocess_id: "ID do Processo de Contrato",
  company_id: "ID da Empresa",
  quotationprocess_id: "ID do Processo de Cotação",
  filterrolerule_id: "ID da Regra de Filtro",
  collaborator_id: "ID do Colaborador",
  department_id: "ID do Departamento",
  family_id: "ID da Família",
  providercategorization_id: "ID da Categorização do Fornecedor",
  supplysubcategory_id: "ID da Subcategoria de Fornecimento",
  providerhomologation_id: "ID da Homologação do Fornecedor",
  plan_id: "ID do Plano",
  module_id: "ID do Módulo",
  process_ptr_id: "ID do Ponteiro do Processo",
  parent_task_id: "ID da Tarefa Pai",
};

/**
 * Converte as colunas de uma tabela em campos com labels amigáveis
 */
export function getTableFields(columns: TableColumn[]): TableField[] {
  return columns.map((column) => ({
    name: column.name,
    type: column.type,
    label: FIELD_LABEL_MAPPING[column.name] || formatFieldName(column.name),
  }));
}

/**
 * Formata o nome do campo para um label mais legível
 * Converte de SNAKE_CASE para Title Case
 */
function formatFieldName(fieldName: string): string {
  return fieldName
    .toLowerCase()
    .split("_")
    .map((word) => {
      // Palavras especiais
      const specialWords: Record<string, string> = {
        id: "ID",
        url: "URL",
        cpf: "CPF",
        cnpj: "CNPJ",
        cep: "CEP",
        uf: "UF",
        ncm: "NCM",
        ean: "EAN",
        erp: "ERP",
        st: "ST",
        ipi: "IPI",
        icms: "ICMS",
        cest: "CEST",
        difal: "DIFAL",
        dtt: "DTT",
      };

      return specialWords[word] || word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

/**
 * Obtém os operadores disponíveis para cada tipo de campo
 */
export const getOperatorsForType = (type: string) => {
  const operators = {
    string: [
      { value: "=", label: "Igual a" },
      { value: "LIKE", label: "Contém" },
      { value: "IS NULL", label: "É nulo" },
      { value: "IS NOT NULL", label: "Não é nulo" },
    ],
    number: [
      { value: "=", label: "Igual a" },
      { value: ">", label: "Maior que" },
      { value: "<", label: "Menor que" },
      { value: ">=", label: "Maior ou igual" },
      { value: "<=", label: "Menor ou igual" },
      { value: "IS NULL", label: "É nulo" },
      { value: "IS NOT NULL", label: "Não é nulo" },
    ],
    date: [
      { value: "=", label: "Igual a" },
      { value: ">", label: "Após" },
      { value: "<", label: "Antes" },
      { value: ">=", label: "A partir de" },
      { value: "<=", label: "Até" },
      { value: "IS NULL", label: "É nulo" },
      { value: "IS NOT NULL", label: "Não é nulo" },
    ],
    boolean: [
      { value: "=", label: "Igual a" },
      { value: "IS NULL", label: "É nulo" },
      { value: "IS NOT NULL", label: "Não é nulo" },
    ],
  };

  return operators[type as keyof typeof operators] || operators.string;
};
