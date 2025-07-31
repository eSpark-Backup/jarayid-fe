import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import ButtonUp from "../../assets/icons/button-close.svg";
import ButtonDown from "../../assets/icons/button-open.svg";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.svg";

const FAQList = ({
  faqs,
  expanded,
  handleChange,
  isArabic,
  showEditDeleteIcons = false,
  onEdit,
  onDelete,
  isLoading,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (!faqs || faqs.length === 0) {
    return (
      <Typography align="center" color="textSecondary" mt={3} my={5}>
        No FAQs available.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "750px",
        margin: "0 auto",
        order: { xs: 2, md: isArabic ? 2 : 1 },
        textAlign: isArabic ? "right" : "left",
      }}
    >
      {faqs?.map((faq, index) => (
        <Accordion
          key={faq.id || index}
          expanded={expanded === index}
          onChange={handleChange(index)}
          elevation={0}
          sx={{
            borderRadius: "16px !important",
            mb: 2,
            border: "1px solid #D9DBE9 !important",
            boxShadow: "0px 5px 15px rgba(25, 33, 61, 0.06) !important",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            sx={{
              "& .MuiAccordionSummary-content": {
                margin: 0,
                width: "100%",
                alignItems: "center",
              },
              minHeight: "unset",
            }}
          >
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              width="100%"
              alignItems={{ xs: "flex-start", sm: "center" }}
              gap={1}
            >
              <Typography
                fontWeight="600"
                fontSize="22px"
                sx={{
                  textAlign: isArabic ? "right" : "left",
                  pr: { xs: 0, sm: 2 },
                  flex: 1,
                  wordBreak: "break-word",
                }}
              >
                {faq.question}
              </Typography>

              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleChange(index)(e, expanded !== index);
                }}
                sx={{
                  "&:hover": { backgroundColor: "#fff" },
                  alignSelf: { xs: "flex-end", sm: "center" },
                }}
              >
                <img
                  src={expanded === index ? ButtonUp : ButtonDown}
                  alt="toggle"
                />
              </IconButton>
            </Box>
          </AccordionSummary>

          <AccordionDetails
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "flex-start" },
              paddingTop: 0,
              mt: "-20px",
              gap: 2,
            }}
          >
            <Typography
              color="#737373"
              fontWeight="400"
              fontSize="16px"
              sx={{
                textAlign: isArabic ? "right" : "left",
                flex: 1,
                wordBreak: "break-word",
              }}
            >
              {faq.answer}
            </Typography>

            {showEditDeleteIcons && (
              <Box
                display="flex"
                flexDirection="column"
                alignItems={{ xs: "flex-end", sm: "center" }}
                gap={0}
                mt={{ xs: 1, sm: 0 }}
              >
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(faq);
                  }}
                  sx={{ "&:hover": { backgroundColor: "#fff" } }}
                >
                  <img src={EditIcon} alt="edit" />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(faq);
                  }}
                  sx={{ "&:hover": { backgroundColor: "#fff" } }}
                >
                  <img src={DeleteIcon} alt="delete" />
                </IconButton>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQList;
